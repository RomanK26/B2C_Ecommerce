from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.order.models import Order, OrderItem
from api.order.serializers import OrderItemSerializer, OrderSerializer
from api.cart.models import Cart
from rest_framework.response import Response
from django.db import transaction

from rest_framework import status

from rest_framework.exceptions import ValidationError


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

    def create(self, request, *args, **kwargs):
        try:
            cart = Cart.objects.get(user=request.user)
            if not cart.items.exists():
                return Response(
                    {"detail": "Cart is Empty"}, status=status.HTTP_400_BAD_REQUEST
                )
        except Cart.DoesNotExist:
            return Response(
                {"detail": "Cart not found"}, status=status.HTTP_404_NOT_FOUND
            )

        order = Order.objects.create(user=request.user)

        try:
            with transaction.atomic():
                for item in cart.items.all():
                    if item.quantity > item.product.quantity:
                        raise ValidationError(
                            f"Insufficient stock for product {item.product}"
                        )
                    OrderItem.objects.create(
                        order=order, product=item.product, quantity=item.quantity
                    )
                    item.product.quantity -= item.quantity
                    item.product.save()
                cart.items.all().delete()
        except ValidationError as e:
            return Response(
                {"error": "Order creation failed.", "details": e.detail},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"error": "Order creation failed.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderItemViewset(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = OrderItem.objects.all()
    http_method_names = ["get", "post"]

    def get_queryset(self):
        items = OrderItem.objects.filter(order__user=self.request.user)
        return items
