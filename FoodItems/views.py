from django.shortcuts import render,get_list_or_404,get_object_or_404

# Create your views here.
from users.models import RestaurantProfile,CustomerReviews,CustomerProfile,User,DeliveryPersonProfile
from .models import OrdersDescription,OrderFoodQuantity,FoodItemsDescription
import re
from django.views.generic import (
	ListView,
	DetailView,
	CreateView,
	UpdateView,
	DeleteView
)

def restaurantsView(request,**kwargs):
    restaurants = get_list_or_404(RestaurantProfile)
    context = {
        'restaurants' : restaurants,
    }
    return render(request,'users/listings/index.html',context)

# class restaurantsView(ListView):
#     model = RestaurantProfile
#     template_name = 'users/listings/index.html'
#     context_object_name = 'restaurant'


def individualRestaurantView(request,pk):
    restaurant = get_object_or_404(RestaurantProfile,pk=pk)

    categories = restaurant.foodcategory_set.all()
    foodItems = {}
    for category in categories:
        foods = category.fooditemsdescription_set.filter(restaurant=restaurant)
        foodItems[category]=foods

    reviews = CustomerReviews.objects.filter(restaurant=restaurant)

    context={
        'restaurant' : restaurant,
        'reviews' : reviews,
        'categories':categories,
        'foodItems':foodItems
    }
    if request.method=='POST':
        if request.POST.get('OrderConfirm'):
            order = OrdersDescription(status=1,
                                    restaurant=restaurant,
                                    customer=get_object_or_404(CustomerProfile,pk=request.POST.get('customer')),
                                    Subtotal=0,
                                    TotalPrice=0,
                                    charges=0,
                                    received=0)
            order.save()
            pat=re.compile('^[0-9]+$')
            sum=0
            for k,v in request.POST.items():
                if pat.match(k):
                    if int(v)>0:
                        foodItem = get_object_or_404(FoodItemsDescription,pk=int(k))
                        sum=sum+(foodItem.price*int(v))
                        quan = OrderFoodQuantity(foodItemId=get_object_or_404(FoodItemsDescription,pk=int(k)),
                                                    quantity=int(v),orderId=order)
                        quan.save()
            order.Subtotal=sum
            order.charges=20
            order.TotalPrice=round(sum+order.charges,2)
            order.received=order.TotalPrice
            order.save()

            deliveryPeople = DeliveryPersonProfile.objects.filter(is_available=True)
            if deliveryPeople:
                order.deliveryPerson = deliveryPeople[0]
                order.save()
                deliveryPeople[0].is_available=False

    return render(request,'users/restaurants/italian-pizza-house/index.html',context)
 