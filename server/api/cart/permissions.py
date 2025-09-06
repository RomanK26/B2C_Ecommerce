from rest_framework.permissions import BasePermission


class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        if request.method in ["POST","DELETE","PATCH","PUT"]:
            return request.user and request.user.role =='customer'
