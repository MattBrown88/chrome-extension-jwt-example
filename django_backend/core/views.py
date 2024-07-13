from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required
def home(request):
    return HttpResponse("Hello, Django!")

