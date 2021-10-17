from django.conf.urls import *
from core import views


urlpatterns         = [
    url('^$',views.index, name='index'),
    url(r'^login/', views.login_user, name='login-user'),
    url(r'^logout/', views.logout_user, name='logout-user'),
    url(r'^register/', views.register_user, name='register-user'),
    url(r'^get-user-information', views.get_user_information, name='get_user_information'),
    url(r'^update-user-information', views.update_user_information, name='update_user_information'),
    url(r'^update-user-password', views.update_user_password, name='update_user_password'),
    url(r'^get-weather-data-by-name', views.get_weather_data_by_name, name='get-weather-data-by-name'),
]