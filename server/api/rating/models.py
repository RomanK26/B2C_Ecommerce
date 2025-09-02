from django.db import models

from api.account.models import Account
from api.product.models import Product

# Create your models here.
# class Rating(models.Model):
#     user = models.ForeignKey(Account,on_delete=models.CASCADE)
#     description = models.TextField()
#     product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="ratings")
#     rating = models.PositiveSmallIntegerField()
#     created_at = models.DateTimeField(auto_now_add=True)
    
    
    
    # class Meta:
    #     unique_together = ("user", "product")
    
    # def __str__(self):
    #     return f"{self.user} - {self.product} ({self.rating})"