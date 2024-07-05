"""
URL configuration for jwt_example project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from core.views import home, CustomLoginView
from dj_rest_auth.jwt_auth import get_refresh_view
from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView


urlpatterns = [
    path("admin/", admin.site.urls),
    
    # NEW
    path("accounts/", include("allauth.urls")),
    path("accounts/login", CustomLoginView.as_view(), name="account_login"),
    path("", home, name="home"),
    
    # restauth views
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("token/refresh/", get_refresh_view().as_view(), name="token_refresh"),
]
