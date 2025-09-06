from django.db import models


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100, help_text="Enter the name of the category")
    description = models.TextField(
        blank=True, null=True, help_text="Enter a description of the category"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ("id",)