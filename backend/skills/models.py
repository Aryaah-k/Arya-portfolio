from django.db import models

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('devops', 'DevOps'),
        ('language', 'Programming Language'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    level = models.IntegerField(default=80)  # percentage (0–100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    icon = models.ImageField(upload_to='skills/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name