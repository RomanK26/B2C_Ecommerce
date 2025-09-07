from api.product.models import Product, ProductImage
from rest_framework.response import Response
from rest_framework import status
from django.db import DatabaseError
from api.product.serializers import ProductSerializer


class ProductService:
    @staticmethod
    def get_all_products():
        products = Product.objects.select_related("category").all()
        return list(products)

    @staticmethod
    def add_product(user, validated_data, files):
        print("in sservice layer",files)
        product = Product.objects.create(**validated_data, created_by=user)
        for img in files.getlist("image"):
            ProductImage.objects.create(product=product, image=img)
        return product

    @staticmethod
    def get_product_detail(pk):
        try:
            product = Product.objects.select_related("category").get(pk=pk)
            return product

        except Product.DoesNotExist:
            return None

    @staticmethod
    def update_product(product, validated_data):
        for attr, value in validated_data.items():
            setattr(product, attr, value)
        product.save()
        return product

    @staticmethod
    def delete_product(product):
        product.delete()
