from rest_framework import serializers

from api.cart.models import Cart, CartItem
from api.product.models import Product


class CartItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), write_only=True
    )
    product_name = serializers.StringRelatedField(source ="product",read_only=True)
    rate = serializers.SerializerMethodField()
    class Meta:
        model = CartItem
        fields = ["product_name", "quantity", "updated_at", "id","product","rate"]
        read_only_fields = ["updated_at","rate"]
     

    def get_rate(self,obj):
        return obj.product.price