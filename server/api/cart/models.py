from django.core.validators import MinValueValidator
from django.db import models

from api.account.models import Account
from api.product.models import Product


# Create your models here.
class Cart(models.Model):
    user = models.OneToOneField(Account,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
class CartItem(models.Model):

    cart = models.ForeignKey(Cart,related_name="items",on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField(default=1,validators=[MinValueValidator(1)])
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return f"{self.cart}_{self.product}"
    
    class Meta:
        unique_together = ("cart", "product")