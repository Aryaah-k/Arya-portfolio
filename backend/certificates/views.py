from django.shortcuts import render
from rest_framework import generics
from .models import Certificate
from .serializers import CertificateSerializer

# GET all + CREATE
class CertificateListCreateView(generics.ListCreateAPIView):
    queryset = Certificate.objects.all().order_by('-issue_date')
    serializer_class = CertificateSerializer


# GET single + UPDATE + DELETE
class CertificateDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
# Create your views here.
