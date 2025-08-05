from rest_framework import serializers

from api.product.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["name", "description", "price", "quantity", "category","id"]
        read_only_fields = ["created_at", "updated_at", "in_stock",'id']
        extra_kwargs = {
            'category': {'required': True}  
        }
