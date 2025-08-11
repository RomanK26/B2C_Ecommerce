from django.urls import path

from api.product.models import Category

from .views import CategoryView, ProductDetailView, ProductListView

urlpatterns = [
    path("products/", ProductListView.as_view(), name="product-list"),
    path("products/<int:pk>/", ProductDetailView.as_view(), name="product-detail"),
    path("category/",CategoryView.as_view(),name='category')
]