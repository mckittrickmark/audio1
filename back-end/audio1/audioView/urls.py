from django.urls import path

from audioView import views

urlpatterns = [
    path('', views.index, name='index'),
]