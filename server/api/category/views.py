from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from api.category.models import Category
from api.category.serializers import CategorySerializer
from api.permissions import IsAdminOrReadOnly


class CategoryView(ListCreateAPIView):
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class CategoryViewEdit(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    http_method_names = ["get", "put", "patch", "delete"]
