from django.contrib.auth import login
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from api.account import serializers
from api.account.models import Account
from api.account.serializers import LoginSerializer


class LoginView(APIView):
    """
    A view for handling user login.
    """

    permission_classes = [AllowAny]
    http_method_names = ["post"]
    serializer_class = LoginSerializer

    def post(self, request):
        """
        Handle user login.
        """
        print("Login request data:", request.data)

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "Login successful.",
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "user_id": user.id,
                },
                status=status.HTTP_200_OK,
            )
