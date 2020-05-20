#!/bin/bash

env=backend.settings.local

if [ "$2" == "PROD" ]; then
    echo "Running on Production environment"
    env=backend.settings.production
elif [ "$2" == "TEST" ]; then
    echo "Running on Testing environment"
    env=backend.settings.testing
else
    echo "Running on Local environment"
fi

if [ "$1" == "START" ]; then
    python3 manage.py runserver --settings=$env
elif [ "$1" == "SUPER_USER" ]; then
    echo "Create a default SUPER_USER"
    echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@backend.com', '12345', first_name='Admin',last_name='Backend')" | python3 manage.py shell --settings=$env
elif [ "$1" == "MIGRATE" ]; then
    echo "Make migrations"
    python3 manage.py makemigrations --settings=$env
    python3 manage.py migrate --settings=$env
else
    python3 manage.py runserver --settings=$env
fi
