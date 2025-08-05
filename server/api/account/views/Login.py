from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from yaml import serialize

from api.account import serializers
from api.account.models import Account
from api.account.serializers import LoginSerializer
from django.contrib.auth import login


class LoginView(APIView):
    """
    A view for handling user login.
    """

    permission_classes = [AllowAny]
    http_method_names = ["post"]

    def post(self, request):
        """
        Handle user login.
        """
        print("Login request data:", request.data)

        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        login(request, user)
        return Response(
            {"message": "Login successful.", "user_id": user.id},
            status=status.HTTP_200_OK,
        )
