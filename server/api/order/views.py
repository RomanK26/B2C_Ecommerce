from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.order.models import Order, OrderItem
from api.order.serializers import OrderItemSerializer, OrderSerializer
from api.cart.models import Cart, CartItem
from rest_framework.response import Response
from django.db import transaction

from rest_framework import status


# Create your views here.
class OrderViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ["get", "post", "patch", "delete"]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Order.objects.all()
        if user.is_staff:
            return queryset
        return queryset.filter(user=self.request.user)

    def perform_create(self, request):
        try:
            cart = Cart.objects.get(user=self.request.user)
            if not cart.items.exists():
                return Response(
                    {"detail": "Cart is Empty"}, status=status.HTTP_400_BAD_REQUEST
                )
        except Cart.DoesNotExist:
            return Response(
                {"detail": "Cart not found"}, status=status.HTTP_404_NOT_FOUND
            )

        order = Order.objects.create(user=self.request.user)
        try:
            with transaction.atomic():
                for item in cart.items.all():
                    OrderItem.objects.create(
                        order=order, product=item.product, quantity=item.quantity
                    )
                cart.items.all().delete()
            return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"error": "Order creation failed.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class OrderItemViewset(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = OrderItem.objects.all()

    def get_queryset(self):
        items = OrderItem.objects.filter(order__user=self.request.user)
        return items

    def perform_create(self, serializer):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        product = serializer.validated_data["product"]
        quantity = serializer.validated_data["quantity"]

        # Check if item already exists in cart
        cart_item = CartItem.objects.filter(cart=cart, product=product).first()

        if cart_item:
            # If exists, update the quantity
            cart_item.quantity += quantity
            cart_item.save()
        else:
            # Else, create a new one
            serializer.save(cart=cart)
