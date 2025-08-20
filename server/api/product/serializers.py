from rest_framework import serializers

from api.product.models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name','description',"created_at",'updated_at']
class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["name", "description", "price", "quantity", "category","id","in_stock"]
        read_only_fields = ["created_at", "updated_at", "in_stock",'id']
        extra_kwargs = {
            'category': {'required': True}  
        }
