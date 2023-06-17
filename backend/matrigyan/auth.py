
# coding: utf-8

from django.shortcuts import render
from django.template.loader import get_template
from django.http import HttpResponseRedirect, HttpResponse, HttpResponsePermanentRedirect
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
# from random import choice
# from string import ascii_letters
import random, string
from django.contrib.auth import logout
from django.utils.timezone import now
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from django.utils.dateparse import parse_date

# from godot.settings import R_SITE_URL
from .models import User
from django.http import JsonResponse
from django.core import serializers
@csrf_exempt
def register_user(request):
    authentic_user = request.user.is_authenticated
    if authentic_user:
        return HttpResponse(json.dumps({'redirect': True}), content_type="application/json")
    # This flag decides if the client registered will be made freelance client or not
    freelance = bool(int(request.POST.get('freelance', '0')))
    email = request.POST.get('email', '')
    password = request.POST.get('password', '')
    first_name = request.POST.get('first_name', '')
    last_name = request.POST.get('last_name', '')
    email2 = request.POST.get('email2', '')
    phone = request.POST.get('phone', '')
    street_address = request.POST.get('street_address', '')
    city = request.POST.get('city', '')
    state = request.POST.get('state', '')
    country = request.POST.get('country', '')
    zipcode = request.POST.get('zipcode', '')
    user = User.objects.filter(email__iexact=email)
    if user.exists():
        msg = 'The email is already registered with us.'
        return HttpResponse(json.dumps({"message": msg, "redirect": False}), content_type="application/json")
    first_name = first_name.lower().strip() if first_name else ''
    last_name = last_name.lower().strip() if last_name else ''
    email = email.lower().strip()
    username = generate_username(email, first_name, last_name)
    user = User.objects.create_user(username, email, password)
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
        client_code, email = create_guser(auth_user, first_name, last_name, email, email2, phone, 
            street_address, city, state, country, zipcode, password, freelance=freelance)
    return HttpResponse(json.dumps({"message": msg, "redirect": redirect}), content_type="application/json")

def create_guser(user, first_name, last_name, email, email2, phone, street_address, city, state, 
    country, zipcode, password, user_type='client', freelance=False, content_type="", cws_reg=False):
    guser = GUser.objects.filter(user=user).first()
    guser_created = False
    if not guser:
        guser = GUser()
        guser.user = user
        guser.user_type = user_type
        guser_created = True
    guser.email = email
    if email2:
        guser.email2 = email2
    if phone:
        guser.phone = phone
    first_name = first_name.title().strip()
    last_name = last_name.title().strip()
    guser.first_name = first_name
    guser.last_name = last_name
    
    # save full name
    guser.full_name = first_name + " " + last_name
    guser.client_code = create_client_code(first_name, last_name)
    # guser.freelance = freelance
    # guser.content_type = content_type
    guser.save()
    # for client registration store the content_type selection
    # to pre-select it on trial order page
    if user_type == 'client' and guser_created:
        get_or_save_reg_client_content_type(guser, content_type=content_type)
    # save user address if provided
    save_guser_address(guser, street_address, city, state, country, zipcode)
    if guser_created:
        # send welcome email on signup/create client
        try:
            # if freelance and user_type == 'client':
            #     send_freelance_client_welcome_email(guser)
            # elif user_type == 'client':
            #     send_welcome_email(guser, password)
            if user_type == "client":
                if not cws_reg:
                    send_freelance_client_welcome_email(guser)
                else:
                    # TBD: CWS welcome email
                    pass
        except Exception as e:
            # print(e)
            pass
    # update first name and last name to User model
    update_first_and_last_name(guser)
    return guser.client_code, guser.email

@csrf_exempt
def login_user(request):
    authentic_user = request.user.is_authenticated
    if authentic_user:
        return HttpResponse(json.dumps({'redirect': True}), content_type="application/json")
    data = check_to_login_registered_user(request)
    return HttpResponse(json.dumps(data), content_type="application/json")


def check_to_login_registered_user(request):
    email = request.POST.get('email', '')
    password = request.POST.get('password', '')
    cws_login = bool(int(request.POST.get('cws_login', '0')))
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
            request.session.set_expiry(narrato_settings.KEEP_LOGGED_DURATION)
        else:
            msg = 'The user is disabled!'
            redirect = False
    else:
        msg = 'Invalid login'
        redirect = False
    return {"message": msg, "redirect": redirect, "success": redirect, "user_id": user.first().id}


def logout_user(request, app_type=None):
    request_source = get_request_source(request)
    if request_source != 'android':
        subdomain = request.subdomain
        # logout to accept cws invite on invited email
        cws_invite = bool(int(request.GET.get('ci', '0')))
        email = request.GET.get('e', '')
        logout(request)
        if cws_invite:
            return HttpResponseRedirect('/cws/login?e='+email)
        if not subdomain:
            # check to land on writer app home page
            if app_type and app_type == AppTypes.WRITER_APP:
                return HttpResponseRedirect('/writer/')
            return HttpResponseRedirect('/marketplace/')
        return HttpResponseRedirect('/')
    else:
        logout(request)
        return_dict = {'success': True}
        return JsonResponse(return_dict)

