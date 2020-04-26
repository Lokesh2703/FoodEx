from django.shortcuts import render,get_list_or_404,get_object_or_404

# Create your views here.
from users.models import RestaurantProfile,CustomerReviews
from django.views.generic import (
	ListView,
	DetailView,
	CreateView,
	UpdateView,
	DeleteView
)

def restaurantsView(request,**kwargs):
    restaurants = get_list_or_404(RestaurantProfile,city='')
    context = {
        'restaurants' : restaurants,
    }
    print(restaurants)
    print(restaurants[0].restaurantName)
    return render(request,'users/listings/index.html',context)

# class restaurantsView(ListView):
#     model = RestaurantProfile
#     template_name = 'users/listings/index.html'
#     context_object_name = 'restaurant'


def individualRestaurantView(request,pk):
    restaurant = get_object_or_404(RestaurantProfile,pk=pk)
    reviews = get_list_or_404(CustomerReviews,restaurant=restaurant)
    print(restaurant)
    context={
        'restaurant' : restaurant,
        'reviews' : reviews
    }
    return render(request,'users/restaurants/italian-pizza-house/index.html',context)
    