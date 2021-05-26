from django.urls import path
from . import views

urlpatterns = [
    path('',views.homepage, name='home'),
    path('signup', views.welcome, name='signup'),
    path('signin', views.existing, name='signin'),
    path('dashboard', views.dashboard, name='dash'),
]
