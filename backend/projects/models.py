from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()

    tech_stack = models.CharField(max_length=255)

    github_link = models.URLField(blank=True, null=True)
    live_demo = models.URLField(blank=True, null=True)

    image = models.ImageField(upload_to='projects/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title