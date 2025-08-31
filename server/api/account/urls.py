from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from api.account.views import (
    LoginView,
    LogoutView,
    MeView,
    RefreshView,
    VerifyEmailView,
)
from api.account.views import RegisterView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("signup/", RegisterView.as_view(), name="signup"),
    path("me/", MeView.as_view(), name="me"),
    path(
        "verify/<str:uid>/<str:token>/", VerifyEmailView.as_view(), name="verify-mail"
    ),
    path("refresh/", RefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    # path("verify/",)
]
