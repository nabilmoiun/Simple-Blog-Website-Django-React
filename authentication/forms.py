from django import forms
from django.contrib.auth.forms import UserCreationForm

from .models import User


class RegisterForm(UserCreationForm):
    """Register form by customizing the django built-in UserCreationForm"""
    first_name = forms.CharField(max_length=150, required=True,
                                 help_text="Max Length 150",
                                 widget=forms.TextInput(attrs={
                                     "class": "form-control",
                                     "id": "first_name",
                                     "autofocus": "autofocus"
                                 }))
    last_name = forms.CharField(max_length=150, required=True,
                                help_text="Max Length 150",
                                widget=forms.TextInput(attrs={
                                    "class": "form-control",
                                    "id": "last_name"
                                }))
    email = forms.EmailField(required=True)
    email.widget.attrs.update({"class": "form-control", "id": "email"})

    password1 = forms.CharField(min_length=8, max_length=150, label="Password", required=True,
                                help_text="Minimum Length 8 Maximum Length 150",
                                widget=forms.PasswordInput(attrs={
                                    "class": "form-control",
                                    "id": "password1"
                                }))
    password2 = forms.CharField(min_length=8, max_length=150, label="Confirm Password", required=True,
                                widget=forms.PasswordInput(attrs={
                                    "class": "form-control",
                                    "id": "password2"
                                }))

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password1', 'password2',)


class LoginForm(forms.ModelForm):
    email = forms.EmailField(required=True)
    email.widget.attrs.update({
        "class": "form-control",
        "id": "email"
    })
    password = forms.CharField(max_length=150,
                               widget=forms.PasswordInput(attrs={
                                   "class": "form-control",
                                   "id": "password"
                               }))

    class Meta:
        model = User
        fields = ('email', 'password',)
