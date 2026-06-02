from django.db import models

class Certificate(models.Model):
    title = models.CharField(max_length=255)
    issuer = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    issue_date = models.DateField()

    # You can upload image OR PDF certificate
    image = models.ImageField(upload_to='certificates/', blank=True, null=True)
    file = models.FileField(upload_to='certificates/files/', blank=True, null=True)

    credential_id = models.CharField(max_length=100, blank=True, null=True)
    credential_url = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title