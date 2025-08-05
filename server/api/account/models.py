from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField


# Create your views here.
class Account(AbstractUser):
    username = None
    email = models.EmailField(
        unique=True, help_text="Required. Enter a valid email address."
    )
    address = models.CharField(max_length=255, blank=True)
    profile_image = models.ImageField(
        upload_to="profile_images/", blank=True, null=True
    )
    phone_number = PhoneNumberField(blank=True, null=True, unique=True)
    is_verified = models.BooleanField(default=False)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return self.email
