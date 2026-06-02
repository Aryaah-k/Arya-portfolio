from django.contrib import admin
from .models import About

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'title', 'hero_title', 'experience_years')
    search_fields = ('full_name', 'title', 'hero_title')
    fields = (
        'full_name',
        'title',
        'hero_title',
        'hero_subtitle',
        'hero_image',
        'bio',
        'email',
        'phone',
        'location',
        'github',
        'linkedin',
        'portfolio_website',
        'resume',
        'experience_years',
    )