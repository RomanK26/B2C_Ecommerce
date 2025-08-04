from rest_framework.serializers import ModelSerializer

from api.account.models import Account


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
        user = Account(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user
