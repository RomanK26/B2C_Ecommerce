from api.account.views import ChangePasswordView, UserProfileView
from django.urls import include, path


urlpatterns = [
    path("auth/", include("api.account.urls")),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path(
        "profile/change-password/",
        ChangePasswordView.as_view(),
        name="change-password",
    ),
    path("", include("api.order.urls")),
    path("products/", include("api.product.urls")),
    path("cart/", include("api.cart.urls")),
    path("category/", include("api.category.urls")),
]
