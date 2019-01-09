from rest_framework import serializers
from .models import Sample

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




