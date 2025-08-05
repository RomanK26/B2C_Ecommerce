from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.account.views.Login import LoginView
from api.account.views.Register import RegisterView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path("logout/",)
    # path("profile/",)
    # path("verify/",)
]
