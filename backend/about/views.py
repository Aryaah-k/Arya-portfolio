from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import About
from .serializers import AboutSerializer

# GET all / POST (create profile)
class AboutListCreateView(generics.ListCreateAPIView):
    queryset = About.objects.all()
    serializer_class = AboutSerializer


# GET single / UPDATE / DELETE
class AboutDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = About.objects.all()
    serializer_class = AboutSerializer