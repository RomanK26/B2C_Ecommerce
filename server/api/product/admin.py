from django.contrib import admin

from api.product.models import Category, Product

# Register your models here.
admin.site.register([Product,Category])