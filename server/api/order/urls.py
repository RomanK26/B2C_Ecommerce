from django.urls import include, path
from rest_framework import routers
from rest_framework_nested.routers import NestedSimpleRouter

from api.order.views import OrderItemViewset, OrderViewset

router = routers.DefaultRouter()
router.register(r"orders", OrderViewset)

items_router = NestedSimpleRouter(router, r"orders", lookup="order")
items_router.register(r"items", OrderItemViewset, basename="items")

urlpatterns = [
    path("", include(router.urls)),
    path("", include(items_router.urls)),
]
