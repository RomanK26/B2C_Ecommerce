from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from .tasks import email_verification_token


User = get_user_model()

class RegisterService:
    @staticmethod
    def verify_user(uid,token):
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