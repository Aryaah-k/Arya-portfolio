from django import forms
from django.contrib.admin.forms import AdminAuthenticationForm

class CustomAdminAuthenticationForm(AdminAuthenticationForm):
    """Admin login form that uses placeholders for email and password.

    The default admin uses the ``username`` field, but our project treats the email as the login identifier.
    Adding ``placeholder`` attributes improves UX without exposing any credentials.
    """

    username = forms.CharField(
        widget=forms.TextInput(
            attrs={
                "placeholder": "Email",
                "autofocus": True,
                "autocomplete": "off",
            }
        )
    )
    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                "placeholder": "Password",
                "autocomplete": "current-password",
            }
        )
    )
