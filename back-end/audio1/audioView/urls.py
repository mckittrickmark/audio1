from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('sample', views.SampleView)


urlpatterns = [
    path('', include(router.urls)),

]