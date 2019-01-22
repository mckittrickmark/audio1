
from rest_framework import views, viewsets
from .serializers import *
from .models import *
from rest_framework.response import Response
import json
from django.http import HttpResponse, JsonResponse

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

class TopicView(viewsets.ViewSet):
  queryset = Topic.objects.all()
  #serializer_class = TopicSerializer

  def list(self, request):
    queryset = Topic.objects.all()
    serializer = TopicSerializer(queryset, many=True)

    return JsonResponse(serializer.data)

  def post(self, request):

    return HttpResponse('This is a POST Request')

class DatePeriodView(viewsets.ModelViewSet):
  queryset = DatePeriod.objects.all()
  serializer_class = DatePeriodSerializer





