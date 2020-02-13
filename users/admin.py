from django.contrib import admin

# Register your models here.
from .models import CustomerProfile,User,RestaurantProfile,DeliveryPersonProfile
from django.contrib.auth.admin import UserAdmin

admin.site.register(User, UserAdmin)
admin.site.register(CustomerProfile)
admin.site.register(RestaurantProfile)
admin.site.register(DeliveryPersonProfile)