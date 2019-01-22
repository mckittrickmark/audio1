from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('sample', views.SampleView);
router.register(r'subreddit', views.SubredditView)
router.register(r'topic', views.TopicView)
router.register(r'dateperiod', views.DatePeriodView)



urlpatterns = [
    path('', include(router.urls)),
]

urlpatterns += router.urls