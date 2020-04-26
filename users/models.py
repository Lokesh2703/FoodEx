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
    restaurantMobile = PhoneNumberField(blank=True)
    managerName = models.CharField(max_length=50,default='',help_text="Manager Name")
    managerMobile = PhoneNumberField(blank=True)
    managerEmail = models.EmailField(blank=True)
    address = models.TextField(blank=True)
    image = models.ImageField(default='default.jpg',upload_to='profile_pics/')
    country = models.CharField(max_length=30,default='')
    state = models.CharField(max_length=50,default='')
    city = models.CharField(max_length=50,default='')
    deliveryTime = models.IntegerField(default=20)

    SERVICE_TYPE =(
        ("delivery","Delivery"),
        ("pickup","Pickup"),
        ("deliveryPickup","Delivery/Pickup")
    )
    serviceType = models.CharField(max_length=20,choices= SERVICE_TYPE,default='delivery')
    cuisine = models.CharField(max_length=30,default='general')

    # paymentTakerFirstName = models.CharField(max_length=30)
    # paymentTakerLastName = models.CharField(max_length=30)
    # paymentTakerEmail = models.EmailField(blank=True)
    # paymentTakerMobile = PhoneNumberField(blank=True)
    # paymentTakerAddress = models.TextField()

    class Meta:
        constraints=[
            models.UniqueConstraint(fields=['restaurantName','city'],name='unique-restaurants')
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


class CustomerReviews(models.Model):
    reviewText = models.TextField()
    dateTime = models.DateTimeField(auto_now_add=True)
    customer = models.ForeignKey(CustomerProfile,on_delete=models.CASCADE)
    restaurant = models.ForeignKey(RestaurantProfile,on_delete=models.CASCADE)
    reviewSubject = models.CharField(max_length=35,default='Review')

    RATINGS_CHOICES = (
        (20,1),
        (40,2),
        (60,3),
        (80,4),
        (100,5)
    )

    ratings = models.IntegerField(choices=RATINGS_CHOICES,default=1,null=False)

