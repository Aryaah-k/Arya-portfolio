from django.contrib import admin
from .models import Certificate

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuer', 'issue_date', 'created_at')
    search_fields = ('title', 'issuer')
    list_filter = ('issuer', 'issue_date')