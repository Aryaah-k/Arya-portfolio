from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import User


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = (
            'email',
            'profile_image',
            'resume',
            'github',
            'linkedin',
            'website',
        )


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = (
            'email',
            'profile_image',
            'resume',
            'github',
            'linkedin',
            'website',
        )


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm
    model = User

    # Organizing fields explicitly so only your assets show under personal info
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Portfolio Assets', {'fields': ('profile_image', 'resume', 'github', 'linkedin', 'website')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'profile_image', 'resume', 'github', 'linkedin', 'website'),
        }),
    )

    list_display = ('email', 'github', 'linkedin', 'website')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    search_fields = ('email', 'github', 'linkedin', 'website')
    ordering = ('email',)
    readonly_fields = ('last_login', 'date_joined')