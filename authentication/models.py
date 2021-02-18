from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin


class CustomUserManager(BaseUserManager):
    """Custom user model to authenticate with email address other than username"""
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The Email Must Be Set")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if not extra_fields.get('is_staff'):
            raise ValueError('Superuser must have is_staff=True')
        if not extra_fields.get('is_superuser'):
            raise ValueError('Superuser must have is_superuser=True')
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, null=False)
    first_name = models.CharField(ugettext_lazy('first name'), max_length=150, blank=True)
    last_name = models.CharField(ugettext_lazy('last name'), max_length=150, blank=True)
    is_staff = models.BooleanField(
        ugettext_lazy('staff status'),
        default=False,
        help_text=ugettext_lazy('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        ugettext_lazy('active'),
        default=True,
        help_text=ugettext_lazy(
            'Designates whether this user should be treated as active. '
            'Deselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(ugettext_lazy('date joined'), default=timezone.now)

    """Have to set the username field email as django built-in user model set it to username by default"""
    USERNAME_FIELD = 'email'
    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email
    
    def get_short_name(self):
        return self.email
