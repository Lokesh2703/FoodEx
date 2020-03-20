from django.db import models

# Create your models here.
from users.models import RestaurantProfile
from PIL import Image

class FoodNames(models.Model):
    food_name = models.CharField(max_length=100,unique=True)

    def __str__(self):
        return f'FoodItem name : {self.food_name}'
    
class FoodItemsDescription(models.Model):
    description = models.TextField(editable=True)
    price = models.DecimalField(decimal_places=2,max_digits=10)
    image = models.ImageField(default='default_food.jpg',upload_to='FoodItems/')
    restaurant = models.ForeignKey(RestaurantProfile,on_delete=models.CASCADE)
    food_name = models.ForeignKey(FoodNames,on_delete=models.CASCADE)

    def __str__(self):
        return f'Food Item: {self.food_name} {self.price} {self.restaurant}'

    def save(self):
        super().save()

        try:
            image=Image.open(self.image.path)
        
            if image.height >300 or image.width > 300:
                output_size=(300,300)
                image.thumbnail(output_size)
                image.save(self.image.path)
        except:
            pass

