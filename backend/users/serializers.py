from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    # This automatically converts database file/image locations into full HTTP URLs
    adminImage = serializers.ImageField(source='profile_image', read_only=True, allow_null=True)
    resumeUrl = serializers.FileField(source='resume', read_only=True, allow_null=True)
    
    # Combine first and last name so your frontend receives a clean single string title
    adminTitle = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'adminTitle',
            'bio',
            'adminImage',
            'resumeUrl',
            'github',
            'linkedin',
            'website',
        ]

    def get_adminTitle(self, obj):
        if obj.first_name or obj.last_name:
            return f"{obj.first_name} {obj.last_name}".strip()
        return "Arya K" # Hardcoded backup if names are empty in admin panel