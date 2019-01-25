from django.urls import path, include
from rest_framework import routers

from . import views

from .views import (
  TopicCreateView
  )

router = routers.DefaultRouter()
router.register('sample', views.SampleView);
router.register('subreddit', views.SubredditView)
router.register('topic', views.TopicView)
router.register('dateperiod', views.DatePeriodView)





urlpatterns = [
    path('', include(router.urls)),
    #path('topic/create', TopicCreateView, name="topic-create")
]

urlpatterns += router.urls