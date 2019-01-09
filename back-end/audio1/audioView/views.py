
from rest_framework import views, viewsets
from .serializers import AudioViewSerializer, SampleSerializer
from .models import Sample
from rest_framework.response import Response
import json
from django.http import HttpResponse

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