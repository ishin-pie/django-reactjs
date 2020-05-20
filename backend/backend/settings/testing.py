from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'swIiqd8bUBfthjZH8aogyFS6qL5nx1wj3dDdfYde0nA1QIEX5kDhHljJouE1jDxMJm6ZMyl2wrOuX9Sy'

DEBUG = True

ALLOWED_HOSTS = []

TIME_ZONE = 'Asia/Phnom_Penh'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
