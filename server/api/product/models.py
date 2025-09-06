from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from api.account.models import Account
from api.category.models import Category
from api.product.utils import product_image_path

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=255, help_text="Enter the product name")
    description = models.TextField(
        blank=True, null=True, help_text="Enter the product description"
    )
    price = models.DecimalField(
        max_digits=8, decimal_places=2, help_text="Enter the product price"
    )
    quantity = models.PositiveIntegerField(
        help_text="Enter the product quantity",
        validators=[MinValueValidator(1)],
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products",
        help_text="Select the product category",
    )
    in_stock = models.BooleanField(default=False)
    created_by = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="product_creator"
    )
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self) -> str:
        return str(self.name)

    def save(self, *args, **kwargs):
        self.in_stock = self.quantity > 0
        super().save(*args, **kwargs)

    class Meta:
        ordering = ("id",)
        verbose_name_plural = "Products"


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="images",
        help_text="Select a product",
    )
    image = models.ImageField(
        upload_to=product_image_path,
        help_text="Enter the product image",
        blank=True,
    )
    created_at = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self.product)


class ProductReview(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="reviews",
        help_text="Select a product",
    )
    user = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        related_name="reviews",
        help_text="Select a user",
    )
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Enter the product rating (1-5)",
    )
    comment = models.TextField(
        blank=True, null=True, help_text="Enter a review comment"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{str(self.product)}_{str(self.user)}"

    class Meta:
        ordering = ("-created_at",)
        unique_together = ("product", "user")
        verbose_name_plural = "Product Reviews"
        # ordering = ("id")
