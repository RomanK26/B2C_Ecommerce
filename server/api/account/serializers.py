from django.contrib.auth import authenticate, password_validation
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.account.models import Account
from api.account.utils import User


class RegisterSerializer(ModelSerializer):
    """
    Serializer for user registration.
    """

    class Meta:
        model = Account
        fields = [
            "id",
            "email",
            "password",
            "address",
            "phone_number",
            "first_name",
            "last_name",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "phone_number": {"write_only": True},
        }

    def create(self, validated_data):
        print(validated_data)
        user = Account(**validated_data)
        print(user)
        user.set_password(validated_data["password"])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login.
    """

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Account
        fields = ["email", "password"]

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        # print("Login validation data:", data)

        if not email or not password:
            raise serializers.ValidationError("Email and password are required.")
        user = authenticate(username=email, password=password)
        # print("Authenticated user:", user)
        if not user:
            raise serializers.ValidationError("Invalid credentials.")
        self.user = user
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "role"]


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name","profile_image","address"]
        read_only_fields = ["id", "username"]


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        password_validation.validate_password(value)
        return value
