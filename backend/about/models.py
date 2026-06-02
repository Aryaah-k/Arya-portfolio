from django.db import models

class About(models.Model):
    full_name = models.CharField(max_length=150)
    title = models.CharField(max_length=150)  # e.g. Full Stack Developer

    hero_title = models.CharField(max_length=200, blank=True, null=True)
    hero_subtitle = models.TextField(blank=True, null=True)
    hero_image = models.ImageField(upload_to='hero/', blank=True, null=True)

    bio = models.TextField()

    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)

    location = models.CharField(max_length=100, blank=True, null=True)

    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    portfolio_website = models.URLField(blank=True, null=True)

    resume = models.FileField(upload_to='resume/', blank=True, null=True)

    experience_years = models.IntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name