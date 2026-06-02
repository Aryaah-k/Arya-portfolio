from django.urls import path
from .views import SkillListCreateView, SkillDetailView

urlpatterns = [
    path('', SkillListCreateView.as_view(), name='skills-list-create'),
    path('<int:pk>/', SkillDetailView.as_view(), name='skills-detail'),
]