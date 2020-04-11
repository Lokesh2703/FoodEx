from django.shortcuts import render

# Create your views here.


def restaurantsView(request):
    return render(request,'users/listings/index.html')

def individualRestaurantView(request):
    return render(request,'users/restaurants/italian-pizza-house/index.html')