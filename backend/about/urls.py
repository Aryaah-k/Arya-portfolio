from django.urls import path
from .views import AboutListCreateView, AboutDetailView

urlpatterns = [
    path('', AboutListCreateView.as_view(), name='about-list-create'),
    path('<int:pk>/', AboutDetailView.as_view(), name='about-detail'),
]