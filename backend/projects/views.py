from django.shortcuts import render
from rest_framework import generics
from .models import Project
from .serializers import ProjectSerializer

# GET all + POST new project
class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer


# GET single + UPDATE + DELETE
class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'

