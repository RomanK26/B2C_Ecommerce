from django.urls import path

from api.account.views.Register import RegisterView

urlpatterns = [
    # path("login/",)
    path("register/",RegisterView.as_view(), name="register"),
    # path("logout/",)
    # path("profile/",)
    # path("verify/",)
    
]
