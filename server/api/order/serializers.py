from rest_framework import serializers

from api.order.models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField()
    order = serializers.StringRelatedField()
    price = serializers.SerializerMethodField()
    

    class Meta:
        model = OrderItem
        fields = ["id", "product", "order", "quantity","price"]
        
    def get_price(self,obj):
        return obj.product.price


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(read_only=True, many=True, source='order_items')
    total_price = serializers.SerializerMethodField(read_only=True)
    user = serializers.SlugRelatedField(read_only=True,slug_field="email")

    class Meta:
        model = Order
        fields = ["id", "user", "created_at", "updated_at", "items","total_price"]
        read_only_fields = ["id", "user", "created_at", "updated_at"]
        
        
    def get_total_price(self,obj):
        print(type(obj))
        print(obj)
        if not isinstance(obj,Order):
            return None
        return sum(item.quantity * item.product.price for item in obj.order_items.all())

