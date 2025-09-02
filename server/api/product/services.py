from api.product.models import Product, ProductImage
from rest_framework.response import Response
from rest_framework import status
from django.db import DatabaseError
from api.product.serializers import ProductSerializer


class ProductService:
    @staticmethod
    def get_all_products():
        try:
            products = Product.objects.select_related("category").all()
            return list(products)
            if not products.exists():
                return Response(
                    {"message": "No products found."}, status=status.HTTP_204_NO_CONTENT
                )
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except DatabaseError as e:
            raise e
            return Response(
                {"error": "Database error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        except Exception as e:
            raise e
            return Response(
                {"error": "An unexpected error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @staticmethod
    def add_product(user, validated_data, files):
        product = Product.objects.create(**validated_data, created_by=user)
        for img in files.getlist("images"):
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
