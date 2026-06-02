from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'tech_stack', 'created_at')
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ('title', 'tech_stack')