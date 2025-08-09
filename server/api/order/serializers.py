from rest_framework import serializers

from api.order.models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField()
    order = serializers.StringRelatedField()

    class Meta:
        model = OrderItem
        fields = ["id", "product", "order", "quantity"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(read_only=True, many=True)

    class Meta:
        model = Order
        fields = ["id", "user", "created_at", "updated_at", "items"]
        read_only_fields = ["id", "user", "created_at", "updated_at", "items"]
