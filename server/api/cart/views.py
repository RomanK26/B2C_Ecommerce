from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.cart.serializers import CartItemSerializer, WriteCartItemSerializer
from api.cart.services import CartService
from api.cart.permissions import IsCustomer


# Create your views here.
class CartItemViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated,IsCustomer]

    def get_serializer_class(self):
        if self.request.method == "GET":
            return CartItemSerializer
        else:
            return WriteCartItemSerializer

    def get_queryset(self):
        return CartService.get_cart_items_for_user(self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = serializer.validated_data["product"]
        quantity = serializer.validated_data["quantity"]

        cart_item, message = CartService.add_or_update_cart_item(
            user=request.user, product=product, quantity=quantity
        )

        read_serializer = CartItemSerializer(cart_item)
        return Response(
            {"message": message, "cart_item": read_serializer.data},
            status=status.HTTP_201_CREATED,
        )
