from rest_framework.permissions import SAFE_METHODS,BasePermission



class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return self.request.user == obj.owner 


class IsAdminOrReadOnly(BasePermission):
    """
    Allow anyone to read, only admin users can write.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:  # GET, HEAD, OPTIONS
            return True
        return request.user and request.user.role == "admin"
