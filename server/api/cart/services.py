from django.db import transaction
from rest_framework.exceptions import ValidationError
from api.cart.models import Cart, CartItem


class CartService:
    @staticmethod
    def add_or_update_cart_item(user, product, quantity):
        cart, _ = Cart.objects.get_or_create(user=user)

        try:
            with transaction.atomic():
                cart_item, created = CartItem.objects.get_or_create(
                    cart=cart,
                    product=product,
                    defaults={"quantity": quantity},
                )

                if not created:
                    cart_item.quantity += quantity
                    cart_item.save()
                    message = "Updated quantity in cart"
                else:
                    message = "Added new item to cart"

        except Exception as e:
            raise ValidationError({"detail": f"Cart update failed: {str(e)}"})

        return cart_item, message

    @staticmethod
    def get_cart_items_for_user(user):
        cart, _ = Cart.objects.get_or_create(user=user)
        return CartItem.objects.filter(cart=cart)
