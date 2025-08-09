from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()

router.register("cart/items", views.CartItemViewSet, basename="cart-items")

urlpatterns = [path("", include(router.urls))]
