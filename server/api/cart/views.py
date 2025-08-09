from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from api.cart.models import Cart, CartItem
from api.cart.serializers import CartItemSerializer


# Create your views here.
class CartItemViewSet(ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        return CartItem.objects.filter(cart=cart)

    def perform_create(self, serializer):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        serializer.save(cart=cart)
