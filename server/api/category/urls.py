from django.urls import path

from api.category.views import CategoryView, CategoryViewEdit

urlpatterns = [
    path("", CategoryView.as_view(), name="category"),
    path("<int:pk>/", CategoryViewEdit.as_view(), name="category_detail"),
]
