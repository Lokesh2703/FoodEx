from django.contrib import admin

# Register your models here.
from .models import FoodNames,FoodItemsDescription

admin.site.register(FoodNames)
admin.site.register(FoodItemsDescription)
