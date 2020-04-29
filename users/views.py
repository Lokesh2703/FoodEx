from django.shortcuts import render,redirect

# Create your views here.
from django.contrib.auth.decorators import user_passes_test
from django.http import HttpResponse
from django.contrib.auth import REDIRECT_FIELD_NAME
from .models import User,RestaurantProfile
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from .models import RestaurantProfile

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


def Customer_Required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url='/user/login'):
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
    restaurants = RestaurantProfile.objects.all()[:6]
    context={
        'title' : 'FoodEx',
        'restaurants' : restaurants,
    }
    print(len(restaurants))
    if request.method == 'POST':
        print(request.POST)
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
    context = {
        'title' : 'Register Restaurant',
        'restaurantName' : 'Pizza Home',
        'username' : 'username',
        'useremail' : 'email@gmail.com',
    }
    if request.method == 'POST':
        if request.POST.get('user-submit')=="Sign Up":
            username = request.POST.get('user_login273579')
            name  = request.POST.get('foodbakery_display_name273579')
            email = request.POST.get('foodbakery_user_email273579')
            password = request.POST.get('foodbakery_user_password793553')
            password = make_password(password)
            userObj = User(username=username,email=email,first_name=name,is_customer=True,password=password)
            userObj.save()
            return redirect('index')
        if request.POST.get('next-btn'):
            restaurantName = request.POST.get('foodbakery_restaurant_title')
            restaurantMobile = request.POST.get('foodbakery_restaurant_contact_phone')
            managerName = request.POST.get('foodbakery_restaurant_manager_name')
            managerMobile = request.POST.get('foodbakery_restaurant_manager_phone')
            managerEmail = request.POST.get('foodbakery_restaurant_contact_email')

            country = request.POST.get('foodbakery_post_loc_country_restaurant')
            state = request.POST.get('foodbakery_post_loc_state_restaurant')
            city = request.POST.get('foodbakery_post_loc_city_restaurant')
            address = request.POST.get('trans_address')

            serviceType = request.POST.get('foodbakery_restaurant_pickup_delivery')
            cuisine = request.POST.get('foodbakery_restaurant_category[]')

            username = request.POST.get('foodbakery_restaurant_username')
            email = request.POST.get('foodbakery_restaurant_user_email')
            password = request.POST.get('foodbakery_restaurant_password')
            password2 = request.POST.get('foodbakery_restaurant_password2')
            password = make_password(password)
            # The case that password1 and password2 are not equal has to be checked and handled
            userObj = User(username=username,email=email,first_name=restaurantName,is_restaurant=True,password=password)
            userObj.save()

            restaurantObj = RestaurantProfile(
                user= userObj,
                restaurantName=restaurantName,
                restaurantMobile=restaurantMobile,
                managerName=managerName,
                managerMobile = managerMobile,
                managerEmail = managerEmail,
                address = address,
                country = country,
                state = state,
                city = city,
                serviceType =serviceType,
                cuisine = cuisine,
            )
            restaurantObj.save()


            return render(request,'users/register-user-and-add-restaurant/index2.html',context)
    return render(request,'users/register-user-and-add-restaurant/index.html',context)

@Customer_Required
def userDashboard(request):
    return render(request,'users/user_dashboard/dashboard.html')

@Customer_Required
def userBookings(request):
    return render(request,'users/user_dashboard/my-bookings.html')

def userLogin(request):
    print(request.GET)
    if request.method == 'POST':
        if request.POST.get('login'):
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                print("Login success",request.GET['next'])
                return redirect(request.GET['next'])
            else:
                return redirect('/')  
    return render(request,'users/my-account/index.html')