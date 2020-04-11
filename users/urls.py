from django.urls import path
from . import views

urlpatterns=[
    path('',views.index,name='index'),
    path('register-restaurant/',views.registerRestaurant,name='register-restaurant')
]