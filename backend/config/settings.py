"""
Django settings for config project.

Optimized for deployment on Railway with Next.js frontend on Vercel.
"""
import os
from pathlib import Path
from datetime import timedelta
import dj_database_url
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load local environment variables if a .env file exists
load_dotenv(BASE_DIR / '.env')

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-&i9#vadc)...')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DJANGO_DEBUG', 'False') == 'True'

# Setup valid hosts for Railway and local development
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '.azurewebsites.net']

# Railway automatically injects RAILWAY_PUBLIC_DOMAIN when a domain is generated
# Azure App Service automatically injects WEBSITE_HOSTNAME when deployed
AZURE_PUBLIC_DOMAIN = os.environ.get('WEBSITE_HOSTNAME')
if AZURE_PUBLIC_DOMAIN:
    ALLOWED_HOSTS.append(AZURE_PUBLIC_DOMAIN)
    # Also add a wildcard subdomain fallback if you use custom domains later
    ALLOWED_HOSTS.append(f".{AZURE_PUBLIC_DOMAIN}")

# CSRF Trusted Origins for Admin panel
CSRF_TRUSTED_ORIGINS = [
    "https://arya-portfolio-backend-d4hmfqbjfpfrb2dv.southindia-01.azurewebsites.net",
    "http://localhost:3000",
]
if AZURE_PUBLIC_DOMAIN:
    CSRF_TRUSTED_ORIGINS.append(f"https://{AZURE_PUBLIC_DOMAIN}")

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'projects',
    'users',
    'skills',
    'certificates',
    'contacts',
    'about',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must stay at the top
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Serves production static assets seamlessly
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS configuration to securely allow your Vercel Next.js app to talk to your backend
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
FRONTEND_URL = os.environ.get('FRONTEND_URL')
if FRONTEND_URL:
    CORS_ALLOWED_ORIGINS.append(FRONTEND_URL)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
}

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# Uses Railway's shared cross-service reference connection string in production
DATABASES = {
    'default': dj_database_url.config(
        conn_max_age=600,
        ssl_require=True
    )
}


# Password validation
AUTH_PASSWORD_VALIDATORS = []


# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
AUTH_USER_MODEL = 'users.User'

# ================= SESSION SECURITY =================
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_COOKIE_AGE = 900

# ================= AZURE & PRODUCTION SETTINGS =================
# Tell Django it's behind a proxy that handles HTTPS
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Prevent 500 errors if a referenced static file is missing in production
WHITENOISE_MANIFEST_STRICT = False