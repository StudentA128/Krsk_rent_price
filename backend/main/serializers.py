from .models import Flat, Advertisement
from django.forms import ModelForm, TextInput
from rest_framework.serializers import ModelSerializer


class FlatSerializer(ModelSerializer):
    class Meta:
        model = Flat
        fields = '__all__'

class AdvertisementSerializer(ModelSerializer):
    class Meta:
        model = Advertisement
        fields = '__all__'