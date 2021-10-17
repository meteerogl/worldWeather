from core.models import *
import json
from datetime import datetime


def get_user_information_from_db(user_name):
    response = dict()
    response['status'] = 0
    response['user_information'] = dict()
    try:
        user = User.objects.get(username=user_name)
        user_information = Person.objects.get(user=user)
        response['user_information']['user_name'] = user.username
        response['user_information']['first_name'] = user.first_name
        response['user_information']['last_name'] = user.last_name
        response['user_information']['email_adress'] = user.email
        response['user_information']['phone_number'] = user_information.phone_number
        response['user_information']['birthday'] = datetime.strftime(user_information.birthday, '%Y-%m-%d')
        response['user_information']['adress'] = user_information.adress
        response['status'] = 1
        response['server_message'] = "Success!"
    except Exception as e:
        response['status'] = 0
        response['server_message'] = 'Server message :' + str(e)
    return json.dumps(response,ensure_ascii=False)


def update_user_information_from_db(user_name, first_name, last_name, email, birthday, adress):
    response = dict()
    response['status'] = 0
    try:
        parsed_date = datetime.strptime(birthday, "%Y-%m-%d")

        userObj                 = User.objects.get(username=user_name)
        personDetailObj = Person.objects.get(user=userObj)

        userObj.first_name      = first_name
        userObj.last_name       = last_name
        userObj.email           = email
        userObj.save()

        personDetailObj.birthday = parsed_date
        personDetailObj.adress = adress
        personDetailObj.save()

        response['status'] = 1
        response['server_message'] = "Success!"
    except Exception as e:
        response['status'] = 0
        response['server_message'] = 'Server message :' + str(e)

    return json.dumps(response,ensure_ascii=False)


def update_user_password_from_db(user_name, password1, password2):
    response = dict()
    response['status'] = 0
    try:
        userObj = User.objects.get(username=user_name)
        if password1 == password2:
            userObj.set_password(password1)
            userObj.save()
            response['status'] = 1
            response['server_message'] = "Success!"
        else:
            response['status'] = 0
            response['server_message'] = "Passwords must be the same."
    except Exception as e:
        response['status'] = 0
        response['server_message'] = 'Server message :' + str(e)
    return json.dumps(response, ensure_ascii=False)


def register_user_to_db(register_name,register_email,register_password1,register_password2):
    response = dict()
    response['status'] = 0
    try:
        if register_password1 == register_password2:
            userObj = User.objects.create(username=register_name,email=register_email)
            if userObj:
                userObj.set_password(register_password1)
                userObj.save()
            personObj = Person.objects.create(user=userObj)
            personObj.save()
            response['status'] = 1
            response['server_message'] = "Success!"
        else:
            response['status'] = 0
            response['server_message'] = "Passwords must be the same."
    except Exception as e:
        response['status'] = 0
        response['server_message'] = 'Server message :' + str(e)

    return json.dumps(response, ensure_ascii=False)




