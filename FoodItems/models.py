from django.db import models

# Create your models here.
from users.models import RestaurantProfile,CustomerProfile
from PIL import Image

class FoodNames(models.Model):
    food_name = models.CharField(max_length=100,unique=True)

    def __str__(self):
        return f'FoodItem name : {self.food_name}'

class FoodCategory(models.Model):
    foodCategories = models.CharField(max_length=30)
    categoryDescription = models.TextField(default="")
    restaurants = models.ManyToManyField(RestaurantProfile,symmetrical=True)
    
    
class FoodItemsDescription(models.Model):
    description = models.TextField(editable=True)
    price = models.DecimalField(decimal_places=2,max_digits=10)
    image = models.ImageField(default='default_food.jpg',upload_to='FoodItems/')
    restaurant = models.ForeignKey(RestaurantProfile,on_delete=models.CASCADE)
    food_name = models.ForeignKey(FoodNames,on_delete=models.CASCADE)
    foodCategory = models.ForeignKey(FoodCategory,on_delete=models.CASCADE,default=0)

    def __str__(self):
        return f'Food Item: {self.food_name} {self.price} {self.restaurant}'

    # def save(self):
    #     super().save()

    #     try:
    #         image=Image.open(self.image.path)
        
    #         if image.height >300 or image.width > 300:
    #             output_size=(300,300)
    #             image.thumbnail(output_size)
    #             image.save(self.image.path)
    #     except:
    #         pass


class OrdersDescription(models.Model):
    dateTime = models.DateTimeField(auto_now_add=True)
    Subtotal = models.DecimalField(max_digits=10,decimal_places=2)
    TotalPrice = models.DecimalField(max_digits=10,decimal_places=2)
    charges = models.DecimalField(max_digits=10,decimal_places=2)
    received = models.DecimalField(max_digits=10,decimal_places=2)
    
    class OrderStatusEnum(models.IntegerChoices):
        PROCESSING = 1
        CONFIRMED = 2
        CANCELLED = 3
        OUTFORDELIVERY = 4
        COMPLETED = 5
    
    status = models.IntegerField(choices=OrderStatusEnum.choices)
    restaurant = models.ForeignKey(RestaurantProfile,on_delete=models.CASCADE)
    customer = models.ForeignKey(CustomerProfile,on_delete=models.CASCADE)
    
class OrderFoodQuantity(models.Model):
    orderId = models.ForeignKey(OrdersDescription,on_delete=models.CASCADE)
    foodItemId = models.ForeignKey(FoodItemsDescription,on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
        