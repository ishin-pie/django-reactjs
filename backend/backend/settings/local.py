from .base import *

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# To generate the secret key we the get_random_string() function of django.utils.crypto module:
# Example: $ python manage.py shell
# from django.utils.crypto import get_random_string
# chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(-_=+)'
# get_random_string(80, chars)

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'w9e&k9&8q^*vsx$xftn(b9x_p-^wz=@2%+)=*-eiswkc&f)k*o'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

TIME_ZONE = 'Asia/Phnom_Penh'
