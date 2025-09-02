from xml.dom import ValidationErr
from django.contrib.auth import get_user_model
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError

from .tasks import email_verification_token

User = get_user_model()


class AuthService:
    @staticmethod
    def login_user(user):
        refresh = RefreshToken.for_user(user)
        accessToken = str(refresh.access_token)
        refreshToken = str(refresh)
        response = Response(
            {"message": "Login successful.", "user_id": user.id, "role": user.role},
            status=status.HTTP_200_OK,
        )
        response.set_cookie(
            key="accessToken",
            value=accessToken,
            httponly=False,
            secure=False,
            samesite="Lax",
            max_age=60 * 15,
        )

        response.set_cookie(
            key="refreshToken",
            value=refreshToken,
            httponly=False,
            secure=False,
            samesite="Lax",
            max_age=60 * 60 * 24 * 7,  # 7 days
        )
        return response

    @staticmethod
    def refresh_token(refresh_token):
        if not refresh_token:
            return AuthenticationFailed("Refresh Token missing")

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            response = Response(
                {"message": "Access token refreshed"}, status=status.HTTP_200_OK
            )
            response.set_cookie(
                key="accessToken",
                value=access_token,
                httponly=False,
                secure=False,
                samesite="None",
                max_age=60 * 15,
            )
            return response
        except Exception:
            return AuthenticationFailed("Invalid refresh token")

    @staticmethod
    def logout_user():
        response = Response({"message": "Logged out"}, status=status.HTTP_200_OK)
        response.delete_cookie("accessToken")
        response.delete_cookie("refreshToken")
        return response


class RegisterService:
    @staticmethod
    def verify_user(uid, token):
        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return False, "Invalid verification link."

        # Token check
        if email_verification_token.check_token(user, token):
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return True, "Account verified successfully!"
            else:
                return True, "Account already verified."
        return False, "Invalid or expired token."


class UserService:
    @staticmethod
    def change_password(user, old_password, new_password):
        if not user.check_password(old_password):
            raise ValidationErr({"old_password": "Wrong password"})
        user.set_password(new_password)
        user.save()
        return Response(
            {"detail": "Password updated successfully"}, status=status.HTTP_200_OK
        )
