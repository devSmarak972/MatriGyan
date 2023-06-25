from django.shortcuts import render
# coding: utf-8

from django.shortcuts import render
from django.template.loader import get_template
from django.http import HttpResponseRedirect, HttpResponse, HttpResponsePermanentRedirect,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

import random, string
from django.contrib.auth import logout
from rest_framework import permissions, status
from rest_framework.authentication import (SessionAuthentication,
                                           TokenAuthentication)
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Course,CourseCategory,CourseSection,Comment,CourseTag,Student,Educator
from .common import update_first_and_last_name
# Create your views here.
from .serializers import CourseSerializer
import backend.settings as matrigyan_settings


class CourseApi(APIView):
    authentication_classes = [JWTAuthentication,TokenAuthentication, SessionAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
        permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if user:
            # puser=
            data = request.GET
            courses=Course.objects.all()
            courses_ser=CourseSerializer(courses)
            print(courses_ser)
            if len(courses)==0:
                return Response({"success":False},status=status.HTTP_200_OK)
            return Response({"success":True,"courses":courses_ser},status=status.HTTP_200_OK)
                
        else:
            return Response({"msg": "Not Authorized"}, status=status.HTTP_401_UNAUTHORIZED)

@csrf_exempt
def login_user(request):
    authentic_user =  request.user.is_authenticated
    print(request.user)
    if authentic_user:
        return HttpResponse(json.dumps({'redirect': True}), content_type="application/json")
    data = check_to_login_registered_user(request)
    return HttpResponse(json.dumps(data), content_type="application/json")

def check_to_login_registered_user(request):
    print("data",request.body)
    data=json.loads(request.body)
    print("data",data)
    email = data.get('email', '')
    password = data.get('password', '')
    email = email.lower().strip()
    user = User.objects.filter(email__iexact=email)
    # to login with username
    if not user:
        user = User.objects.filter(username=email)
    # if user:
    #    check_to_set_dummy_password(user.first())
    if not user.exists():
        msg = 'This email is not registered with us.'
        return {"message": msg, "redirect": False, "success": False}
    elif not user.first().check_password(password):
        msg = "Username or password is incorrect. Please check and try again."
        return {"message": msg, "redirect": False, "success": False}
    else:
        username = user.first().username
    auth_user = authenticate(username=username, password=password)
    if auth_user is not None:
        if auth_user.is_active:
            login(request, auth_user)
            msg = "Signed in successfully!"
            redirect = True
            request.session.set_expiry(matrigyan_settings.KEEP_LOGGED_DURATION)
        else:
            msg = 'The user is disabled!'
            redirect = False
    else:
        msg = 'Invalid login'
        redirect = False
    return {"message": msg, "redirect": redirect, "success": redirect, "user_id": user.first().id}

def logout_user(request, app_type=None):
   
        logout(request)
        return_dict = {'success': True}
        return JsonResponse(return_dict)

def generate_username(email, first_name, last_name):
    print(email)
    if first_name or last_name:
        username = first_name + last_name
    else:
        username = email
    username = username[:30]
    if not User.objects.filter(username=username).exists():
        return username
    username_exists = True
    # print(username_exists)
    username = username[:25]
    while username_exists:
        username = username + ''.join(random.choice(string.ascii_letters) for i in range(5))
        username_exists = User.objects.filter(username=username).exists()
    
    print(username)
    return username


@csrf_exempt
def register_user(request):
    authentic_user = False & request.user.is_authenticated
    if authentic_user:
        return HttpResponse(json.dumps({'redirect': True}), content_type="application/json")
    # This flag decides if the client registered will be made freelance client or not
    print(json.loads(request.body))
    data=json.loads(request.body)
    email = data.get('email', '')
    password = data.get('password', '')
    first_name = data.get('first_name', '')
    last_name = data.get('last_name', '')
    phone = data.get('phone', '')
    city = data.get('city', '')
    state = data.get('state', '')
    country = data.get('country', '')
    zipcode = data.get('zipcode', '')
    user = User.objects.filter(email__iexact=email)
    if user.exists():
        msg = 'The email is already registered with us.'
        return HttpResponse(json.dumps({"message": msg, "redirect": False}), content_type="application/json")
    first_name = first_name.lower().strip() if first_name else ''
    last_name = last_name.lower().strip() if last_name else ''
    email = email.lower().strip()
    print(user,email,password,first_name,"data")
    username = generate_username(email, first_name, last_name)
    user = User.objects.create_user(username, email, password)
    print(user)
    auth_user = authenticate(username=username, password=password)
    if auth_user is not None:
        if auth_user.is_active:
            login(request, auth_user)
            msg = []
            redirect = True
        else:
            msg = 'The user is disabled!'
            redirect = False
    else:
        msg = 'Invalid login'
        redirect = False
    if redirect:
            email = create_student(auth_user, first_name, last_name, email, phone,password, 
            city, state, country, zipcode)
    return HttpResponse(json.dumps({"message": msg, "redirect": redirect}), content_type="application/json")


def create_student(user, first_name, last_name, email, phone, password, city="", state="", 
    country="", zipcode="", user_type='student'):
    guser = Student.objects.filter(user=user).first()
    guser_created = False
    if not guser:
        guser = Student()
        guser.user = user
        guser.user_type = user_type
        guser_created = True
    guser.email = email

    if phone:
        guser.phone = phone
    first_name = first_name.title().strip()
    last_name = last_name.title().strip()
    guser.first_name = first_name
    guser.last_name = last_name
    
    # save full name
    guser.full_name = first_name + " " + last_name
    # guser.client_code = create_client_code(first_name, last_name)
    # guser.freelance = freelance
    # guser.content_type = content_type
    guser.save()

    # save user address if provided
    # save_guser_address(guser, street_address, city, state, country, zipcode)
    # if guser_created:
        # send welcome email on signup/create client
        # try:

        #     if user_type == "client":
        #         if not cws_reg:
        #             send_freelance_client_welcome_email(guser)
        #         else:
        #             # TBD: CWS welcome email
        #             pass
        # except Exception as e:
        #     # print(e)
        #     pass
    # update first name and last name to User model
    update_first_and_last_name(guser)
    return guser.email

