from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from api.account.serializers import RegisterSerializer


class RegisterView(CreateAPIView):
    """
    A view for handling user registration.
    """

    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
