from django.shortcuts import render,redirect

# Create your views here.
from django.contrib.auth.decorators import user_passes_test
from django.http import HttpResponse
from django.contrib.auth import REDIRECT_FIELD_NAME
from .models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login, logout

def Restaurant_Required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url=None):
    """
    Decorator for views that checks that the user is logged in, redirecting
    to the log-in page if necessary.
    """
    actual_decorator = user_passes_test(
        lambda u: u.is_authenticated and u.is_active and u.is_restaurant,
        login_url=login_url,
        redirect_field_name=redirect_field_name
    )
    if function:
        return actual_decorator(function)
    return actual_decorator


def Customer_Required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url=None):
    """
    Decorator for views that checks that the user is logged in, redirecting
    to the log-in page if necessary.
    """
    actual_decorator = user_passes_test(
        lambda u: u.is_authenticated and u.is_active and u.is_customer,
        login_url=login_url,
        redirect_field_name=redirect_field_name
    )
    if function:
        return actual_decorator(function)
    return actual_decorator
    

def DeliveryPerson_Required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url=None):
    """
    Decorator for views that checks that the user is logged in, redirecting
    to the log-in page if necessary.
    """
    actual_decorator = user_passes_test(
        lambda u: u.is_authenticated and u.is_active and u.is_delivery_person,
        login_url=login_url,
        redirect_field_name=redirect_field_name
    )
    if function:
        return actual_decorator(function)
    return actual_decorator

def index(request):
    context={
        'title' : 'FoodEx'
    }
    if request.method == 'POST':
        if request.POST.get('user-submit')=="Sign Up":
            username = request.POST.get('user_login793553')
            name  = request.POST.get('foodbakery_display_name793553')
            email = request.POST.get('foodbakery_user_email793553')
            password = request.POST.get('foodbakery_user_password793553')
            password = make_password(password)
            userObj = User(username=username,email=email,first_name=name,is_customer=True,password=password)
            userObj.save()
        if request.POST.get('user-submit-login'):
            username = request.POST.get('user_login92408')
            password =  request.POST.get('user_pass92408')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('/')
            else:
                return redirect('/logout/')
    return render(request,'users/index.html',context)

def logout_view(request):
    logout(request)
    return redirect('/')

def registerRestaurant(request):
    return render(request,'users/register-user-and-add-restaurant/index.html')