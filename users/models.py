from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from PIL import Image

class User(AbstractUser):
    is_customer=models.BooleanField('Customer Status',default=False)
    is_restaurant=models.BooleanField('Restaurant Status',default=False)
    is_delivery_person=models.BooleanField('Delivery Person Status',default=False)

class CustomerProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    mobile = PhoneNumberField()
    address = models.CharField(max_length=200)
    image = models.ImageField(default='default.jpg',upload_to='profile_pics/')

    def __str__(self):
        return f'{self.user.username} Profile'

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

class RestaurantProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    restaurantName = models.CharField(max_length=50,default='',help_text="Restaurant Name")
    mobile = PhoneNumberField()
    address = models.CharField(max_length=200)
    image = models.ImageField(default='default.jpg',upload_to='profile_pics/')
    location = models.CharField(max_length=50,default='')
    
    class Meta:
        constraints=[
            models.UniqueConstraint(fields=['restaurantName','location'],name='unique-restaurants')
        ]

    def __str__(self):
        return f'{self.user.username} Profile'

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

class DeliveryPersonProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    mobile = PhoneNumberField()
    address = models.CharField(max_length=200)
    image = models.ImageField(default='default.jpg',upload_to='profile_pics/')

    def __str__(self):
        return f'{self.user.username} Profile'

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


