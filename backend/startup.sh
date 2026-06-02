#!/bin/bash
# Install dependencies (just in case)
pip install -r requirements.txt

# Run migrations and collect static assets
python manage.py collectstatic --no-input
python manage.py migrate

# Start the production Gunicorn server
gunicorn --bind=0.0.0.0:8000 --timeout 600 config.wsgi:application