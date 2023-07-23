"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.2.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
from datetime import datetime
import os
import environ
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
# APP_DATA_ROOT = '/efs'
env = environ.Env()

environ.Env.read_env()
FRONTEND_URL="http://localhost:3000"

#LANGTOOL_HOST = os.environ['LANGTOOL_HOST']
#ENVIRONMENT = os.environ['ENVIRONMENT']
ENVIRONMENT = env('ENVIRONMENT')

PROD = True if ENVIRONMENT == "PRODUCTION" else False
DEV = True if ENVIRONMENT == "DEVELOPMENT" else False
STAGING = True if ENVIRONMENT == "STAGING" else False

# DEBUG = False if PROD else True

AZURE_STORAGE_CONNECTIONSTRING="DefaultEndpointsProtocol=https;AccountName=matrigyan;AccountKey=lgQbT5xCpYkX6pTc5xY9mnrx5bLtcp+QWSdz+f94y8JCa9Ilp5Ta/C+IV7p9UGWq2GYYcLyogfaW+AStyRSAtw==;EndpointSuffix=core.windows.net"
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-(27h%fzc7bs+d=_!lxtp49l@p@agm7+5e9_!4weof-=+a0f&ja'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

KEEP_LOGGED_DURATION=5184000 #60 days
CSRF_TRUSTED_ORIGINS = ['http://localhost:3000','https://matrigyan.com','https://www.matrigyan.com',"https://matrigyan972.pythonanywhere.com"]
ALLOWED_HOSTS = [
    'localhost','matrigyan.com','www.matrigyan.com',"matrigyan972.pythonanywhere.com","*"
]

CORS_ORIGIN_WHITELIST = [

    'http://localhost:3000','https://matrigyan.com',"https://www.matrigyan.com","https://matrigyan972.pythonanywhere.com"
]

# Email
# AWS_SES_ACCESS_KEY_ID = env('AWS_SES_ACCESS_KEY_ID')
# AWS_SES_SECRET_ACCESS_KEY = env('AWS_SES_SECRET_ACCESS_KEY')
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = 'Matrigyan <matrigyan@gmail.com>'
EMAIL_BACKEND = 'django_ses.SESBackend'
# AWS_SES_REGION_NAME = 'us-west-2'
# AWS_SES_REGION_ENDPOINT = 'email.us-west-2.amazonaws.com'

# Application definition

INSTALLED_APPS = [

    # 'channels',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'matrigyan',

]



# CORS_ORIGIN_ALLOW_ALL = True
# CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_HEADERS=['accept',
'accept-encoding',
'authorization',
'content-type',
'Access-Control-Allow-Credentials'
'dnt',
'origin',
'user-agent',
'x-csrftoken',
'x-requested-with',

"Cookie"
]
# CSRF_USE_SESSIONS=True
# CSRF_COOKIE_NAME="csrftoken"
# CORS_ALLOW_CREDENTIALS=True
CORS_EXPOSE_HEADERS=["*","Cookie"]
CORS_ALLOW_ALL_ORIGINS  = True
CORS_ORIGIN_WHITELIST = (

       'http://localhost:3000','https://matrigyan.com',"https://matrigyan972.pythonanywhere.com",'https://www.matrigyan.com'
)
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
"https://domain.com",
"https://api.domain.com",
"http://localhost:3000",
"http://127.0.0.1:3000",
"https://www.matrigyan.com",
'https://matrigyan.com'
]# If this is used, then not need to use `CORS_ALLOW_ALL_ORIGINS = True`
CORS_ALLOWED_ORIGIN_REGEXES = [
    'http://localhost:3000','https://matrigyan.com','https://www.matrigyan.com'"https://matrigyan972.pythonanywhere.com"
]
CORS_ALLOW_METHODS = [
'DELETE',
'GET',
'OPTIONS',
'PATCH',
'POST',
'PUT',
]
if PROD is True:
    SESSION_COOKIE_SECURE = True 
    CSRF_COOKIE_SECURE = True 
    CSRF_COOKIE_SAMESITE = 'None'
    SESSION_COOKIE_SAMESITE = 'None'
MIDDLEWARE = [

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # 'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        # 'rest_framework_simplejwt.authentication.JWTAuthentication',

    ],

    'DEFAULT_PERMISSION_CLASSES':[
        'rest_framework.permissions.IsAuthenticated'
    ]
}
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=1440),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}
ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
# ASGI_APPLICATION = "backend.asgi.application"

# CHANNEL_LAYERS = {
#     "default": {
#         "BACKEND": "channels_redis.core.RedisChannelLayer",
#         "CONFIG": {
#             "hosts": [("127.0.0.1", 6379)],
#         },
#     },
# }

# CORS_ALLOWED_ORIGINS = [
#     'http://localhost:3000','https://matrigyan.com'
# ]
#test

CSRF_HEADER_NAME = 'HTTP_X_CSRFTOKEN'