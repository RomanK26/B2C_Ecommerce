from django.db import transaction
from rest_framework.exceptions import ValidationError
from api.cart.models import Cart
from api.order.models import Order, OrderItem


class OrderService:
    @staticmethod
    def create_order_for_user(user):
        try:
            cart = Cart.objects.get(user=user)
            if not cart.items.exists():
                raise ValidationError({"detail": "Cart is Empty"})
        except Cart.DoesNotExist:
            raise ValidationError({"detail": "Cart not found"})

        order = Order.objects.create(user=user)

        try:
            with transaction.atomic():
                for item in cart.items.all():
                    if item.quantity > item.product.quantity:
                        raise ValidationError(
                            {"detail": f"Insufficient stock for product {item.product}"}
                        )
                    OrderItem.objects.create(
                        order=order, product=item.product, quantity=item.quantity
                    )
                    item.product.quantity -= item.quantity
                    item.product.save()
                cart.items.all().delete()
        except ValidationError:
            raise
        except Exception as e:
            raise ValidationError({"detail": str(e)})

        return order

    @staticmethod
    def get_orders_for_user(user):
        queryset = Order.objects.all()
        if user.role != "admin":
            queryset = queryset.filter(user=user)
        return queryset
