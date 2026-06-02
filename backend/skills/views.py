from django.shortcuts import render
from rest_framework import generics
from .models import Skill
from .serializers import SkillSerializer

# GET all skills + POST new skill
class SkillListCreateView(generics.ListCreateAPIView):
    queryset = Skill.objects.all().order_by('-created_at')
    serializer_class = SkillSerializer


# GET single + UPDATE + DELETE skill
class SkillDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
# Create your views here.
