from .models import AnalyzedApartment
from .models import Address
from django.forms import ModelForm, TextInput
from rest_framework.serializers import ModelSerializer


class AnalyzedApartmentSerializer(ModelSerializer):
    class Meta:
        model = AnalyzedApartment
        fields = '__all__'

class AddressSerializer(ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
