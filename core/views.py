from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from core.model_manipulators import *
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from .session_handler import *
import requests
from django.conf import settings
import json

def login_user(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            #Set session variables for user in core.session_handler.py
            #set_init_session_username(request, request.user)
            return HttpResponseRedirect('/')
        else:
            return render(request, 'login.html',
                          {'error': 'Your username or password is wrong!'})
    return render(request, "login.html")


@login_required
def logout_user(request):
    logout(request)
    return HttpResponseRedirect('/login')


@csrf_exempt
def register_user(request):
    if request.method == "GET":
        return render(request, "register.html")
    else:
        register_name = request.POST.get('register_name')
        register_email = request.POST.get('register_email')
        register_password1 = request.POST.get('register_password1')
        register_password2 = request.POST.get('register_password2')
        #TODO: AFTER REGISTER SUCCESSFULL GO TO LOGIN PAGE
        json_str = register_user_to_db(register_name,register_email,register_password1,register_password2)
        return HttpResponse(json_str, content_type='application/json;  charset=utf-8')


@login_required
def index(request):
    # We can get session data (user information etc.) on core.session_handler.py
    # We don't need this time
    return render(request, "index.html", context={"username": request.user})


@login_required
@require_POST
@csrf_exempt
def get_user_information(request):
    json_str = get_user_information_from_db(request.user)
    return HttpResponse(json_str, content_type='application/json;  charset=utf-8')


@login_required
@require_POST
@csrf_exempt
def update_user_information(request):
    user_name   = request.user
    first_name  = request.POST.get("first_name", False)
    last_name   = request.POST.get("last_name", False)
    email       = request.POST.get("email", False)
    birthday    = request.POST.get("birthday", False)
    adress      = request.POST.get("adress", False)
    json_str    = update_user_information_from_db(user_name, first_name, last_name, email, birthday, adress)
    return HttpResponse(json_str, content_type='application/json;  charset=utf-8')


@login_required
@require_POST
@csrf_exempt
def update_user_password(request):
    user_name = request.user
    password1 = request.POST.get("password1")
    password2 = request.POST.get("password2")
    json_str = update_user_password_from_db(user_name,password1,password2)
    return HttpResponse(json_str, content_type='application/json;  charset=utf-8')


@login_required
@require_POST
@csrf_exempt
def get_weather_data_by_name(request):
    response = dict()
    response['status'] = 0

    # Get api informations
    api_url                 = settings.WEATHERONLINE_API_URL
    api_key                 = settings.WEATHERONLINE_API_KEY

    params                  = dict()
    params['format']        = "json"
    params['key']           = api_key
    params['q']             = request.POST.get('city_name', False)
    params['num_of_days']   = request.POST.get('number_of_day', False)

    api_response = requests.post(url=api_url,params=params)

    response['status'] = 1
    response['data']   = json.loads(api_response.text)['data']
    return HttpResponse(json.dumps(response), content_type='application/json;  charset=utf-8')



