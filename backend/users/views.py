from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer

# Register User
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


# Get / Update logged-in user profile
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    # 1. Allow public read access (IsAuthenticatedOrReadOnly) so your home page can view it without being logged in!
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_object(self):
        # If the user is authenticated, return their profile
        if self.request.user.is_authenticated:
            return self.request.user
        
        # 2. For anonymous homepage visitors, return your primary/admin profile data
        admin_user = User.objects.filter(is_superuser=True).first() or User.objects.first()
        return admin_user

    # 3. Explicitly override the retrieve method to ensure full URLs are computed for your images
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            return Response({"detail": "Profile not found"}, status=404)
        
        # Passing context={"request": request} forces the serializer to append the full server path
        serializer = self.get_serializer(instance, context={"request": request})
        return Response(serializer.data)