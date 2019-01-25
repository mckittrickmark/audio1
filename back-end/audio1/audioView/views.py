
from rest_framework import views, viewsets
from rest_framework  import generics
from .serializers import *
from .models import *
from rest_framework.response import Response
import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt




#from django.http import HttpResponse
#from django.shortcuts import render

class ListAudio(views.APIView):
  def get(self, request):
    #queryset = [{"field1": "HEY", "field2": 1}]
    #results = AudioViewSerializer(queryset, many=True).data
    raw_data = {"field1": "HEY", "field2": 1}
    data = json.dumps(raw_data)

    #responseHeaders = {"Access-Control-Allow-Origin": "*"}

    return Response(raw_data)

class SampleView(viewsets.ModelViewSet):
  queryset = Sample.objects.all()
  serializer_class = SampleSerializer

class SubredditView(viewsets.ModelViewSet):
  queryset = Subreddit.objects.all()
  serializer_class = SubredditSerializer

class TopicView(viewsets.ModelViewSet):
  queryset = Topic.objects.all()
  serializer_class = TopicSerializer

@csrf_exempt
class TopicCreateView(generics.CreateAPIView):
  queryset = Topic.objects.all()
  serializer_class = TopicSerializer

  def __init__(self, name):
    self.name= name

  def get(self, request, *args, **kwargs):
    print("TEST")
    return HttpResponse("TESTING123")

  def create(self, *args, request, **kwargs):
    print(request)
    return JsonResponse("This is what was returned")

class DatePeriodView(viewsets.ModelViewSet):
  queryset = DatePeriod.objects.all()
  serializer_class = DatePeriodSerializer





