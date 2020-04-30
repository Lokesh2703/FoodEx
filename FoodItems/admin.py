from django.contrib import admin

# Register your models here.
from .models import FoodNames,FoodItemsDescription,OrdersDescription,OrderFoodQuantity,FoodCategory

admin.site.register(FoodNames)
admin.site.register(FoodItemsDescription)
admin.site.register(OrdersDescription)
admin.site.register(OrderFoodQuantity)
admin.site.register(FoodCategory)