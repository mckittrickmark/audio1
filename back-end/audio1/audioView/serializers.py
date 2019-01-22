from rest_framework import serializers
from .models import *

class AudioViewSerializer(serializers.Serializer):
    class Meta:
        fields = (
          "field1",
          "field2"
        )
        field1 = serializers.CharField()
        field2 = serializers.IntegerField()

class SampleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Sample
    fields = ('id', 'name', 'description')

class SubredditSerializer(serializers.ModelSerializer):
  class Meta:
    model = Subreddit
    fields = ('name', 'id')

class DatePeriodSerializer(serializers.ModelSerializer):
  class Meta:
    model = DatePeriod
    fields = ('period_start', 'period_end', 'id')

class TopicSerializer(serializers.Serializer):
  name = serializers.CharField(max_length=255, default="")
  subreddit_id = serializers.IntegerField()
  date_period_id = serializers.IntegerField()
  sentiment_score = serializers.IntegerField()
  subreddit_rank = serializers.IntegerField()
  frequency = serializers.IntegerField()

  class Meta:
    model = Topic
    fields = ('name', 'subreddit_id')





