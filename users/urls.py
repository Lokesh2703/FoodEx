from django.urls import path
from . import views

urlpatterns=[
    path('',views.index,name='index'),
    path('users/login/',views.userLogin,name='userLogin'),
    path('user/login/',views.userLoginGeneral,name='userLoginGeneral'),
    path('register-restaurant/',views.registerRestaurant,name='register-restaurant'),
    path('user/<int:pk>/dashboard/',views.userDashboard,name='dashboard1'),
    path('user/<int:pk>/dashboard/bookings',views.userBookings,name='userbookings'),
    path('user/<int:pk>/dashboard/myorders',views.userOrders,name='userorders'),
    path('user/accountsetting/',views.userAccountSetting,name='userAccountSetting'),
    path('restaurant/<int:pk>/orders/',views.restaurantOrders,name='restaurantOrdersboard'),
    path('deliveryperson/login/',views.deliveryPersonLogin,name='deliveryPersonLogin'),
    path('deliveryperson/register/',views.deliveryPersonRegister,name='deliveryPersonRegister'),
    path('deliveryperson/<int:pk>/orders/',views.deliveryPersonOrders,name='deliveryPersonOrdersboard'),
]