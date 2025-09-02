from rest_framework import status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.order.models import Order, OrderItem
from api.order.serializers import OrderItemSerializer, OrderSerializer
from api.order.services import OrderService


# Create your views here.
class OrderViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ["get", "post"]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        return OrderService.get_orders_for_user(self.request.user)

    def create(self, request, *args, **kwargs):
        try:
            order = OrderService.create_order_for_user(request.user)
        except ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": "Order creation failed", "details": str(e)},
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
