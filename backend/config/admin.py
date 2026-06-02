from django.contrib import admin
from backend.users.forms import CustomAdminAuthenticationForm

# Use the custom admin authentication form with placeholders
admin.site.login_form = CustomAdminAuthenticationForm
