from rest_framework import serializers

from api.product.models import Product, ProductImage
from api.category.models import Category


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image"]


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category = serializers.SlugRelatedField(read_only=True, slug_field="name")

    class Meta:
        model = Product
        fields = [
            "name",
            "description",
            "price",
            "quantity",
            "category",
            "id",
            "in_stock",
            "images",
        ]
        read_only_fields = ["created_at", "updated_at", "in_stock", "id"]
        extra_kwargs = {"category": {"required": True}}


class ProductCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )
    # Accept category as integer from FormData
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all()
    )
    

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            "images",
            "quantity",
            "category",
        ]

    def create(self, validated_data):
        images = validated_data.pop("images", [])
        product = Product.objects.create(**validated_data)
        for img in images:
            ProductImage.objects.create(product=product, image=img)
        return product
