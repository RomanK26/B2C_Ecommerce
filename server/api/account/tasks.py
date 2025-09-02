from venv import logger

import environ
from celery import shared_task
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

env = environ.Env()


# tokens.py


class EmailVerificationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return f"{user.pk}{timestamp}"


email_verification_token = EmailVerificationTokenGenerator()


@shared_task(bind=True, max_retries=3)
def send_verification_email(self, user_pk):
    from django.contrib.auth import get_user_model

    User = get_user_model()
    try:
        user = User.objects.get(pk=user_pk)  # fetch the user from DB
        uid = urlsafe_base64_encode(force_bytes(user.pk))  # use dot notation
        token = email_verification_token.make_token(user)

        verification_url = f"{env('CLIENT_URL')}/signup/verify/{uid}/{token}"

        send_mail(
            "Verify your account",
            f"Click here: {verification_url}",
            "no-reply@example.com",
            [user.email],  # use dot notation
        )
        return f"Email sent to {user.email}"

    except User.DoesNotExist:
        return f"Failed: User {user_pk} not found."
    except Exception as e:
        raise self.retry(exc=e, countdown=60)
