from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings

from allauth.account.views import SignupView, LoginView
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError

# Create your views here.
def home(request):
    return HttpResponse("Hello, Django!")





def set_jwt_cookies(user, response):
        refresh = RefreshToken.for_user(user)
        cookie_name = settings.REST_AUTH['JWT_AUTH_COOKIE']
        print(refresh.access_token)
        response.set_cookie(
            cookie_name,
            str(refresh.access_token),
            httponly=True,
            secure=False,  # Change to True in production
            samesite='lax'
        )
        refresh_token_name = settings.REST_AUTH['JWT_AUTH_REFRESH_COOKIE']
        response.set_cookie(
            refresh_token_name,
            str(refresh),
            httponly=True,
            secure=False,  # Change to True in production
            samesite='lax'
        )
    

class CustomLoginView(LoginView):
    def form_valid(self, form):
        response = super().form_valid(form)
        user = self.request.user
        set_jwt_cookies(user, response)
        return response
