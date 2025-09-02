from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.account.serializers import (
    ChangePasswordSerializer,
    LoginSerializer,
    RegisterSerializer,
    UserProfileSerializer,
    UserSerializer,
)
from api.account.services import AuthService, RegisterService, UserService
from api.account.tasks import send_verification_email


class RegisterView(CreateAPIView):
    """
    A view for handling user registration.
    """

    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        send_verification_email.delay(user.pk)


class VerifyEmailView(APIView):
    http_method_names = ["get"]

    def get(self, request, uid, token):
        success, message = RegisterService.verify_user(uid, token)
        if success:
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        if user is not None:
            return AuthService.login_user(user)


class RefreshView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refreshToken")
        return AuthService.refresh_token(refresh_token)


class LogoutView(APIView):
    def post(self, request):
        return AuthService.logout_user()


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserProfileView(RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """
        - return currently logged in user
        """
        return self.request.user


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ["patch"]

    def patch(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            response_data = UserService.change_password(
                user=request.user,
                old_password=serializer.validated_data["old_password"],
                new_password=serializer.validated_data["new_password"],
            )
            return response_data
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
