from django.shortcuts import render
from rest_framework import generics
from .models import Contact
from .serializers import ContactSerializer

# GET all messages + POST new message (contact form)
class ContactListCreateView(generics.ListCreateAPIView):
    queryset = Contact.objects.all().order_by('-created_at')
    serializer_class = ContactSerializer


# GET / UPDATE / DELETE single message
class ContactDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
# Create your views here.
