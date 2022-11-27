import pandas as pd
import pickle

from .serializers import FlatSerializer, AdvertisementSerializer
from .models import Flat, Advertisement
from rest_framework.response import Response
from rest_framework.decorators import api_view
from geopy.geocoders import Nominatim
from geopy.distance import geodesic



@api_view(['GET', 'POST'])
def info(request):
    if request.method == 'POST':
        data = request.data

        flat = pd.DataFrame({
            'Rooms': [data['countOfRooms']],
            'Square': [data['area']],
            'Material': [data['houseType']],
            'Floor': [data['floor']],
            'FloorsTotal': [data['floorNum']],
            'Repair': [data['repair']],
            'District': [data['district']],
            'Latitude': [data['latitude']],
            'Longitude': [data['longitude']],
        })

        city_center_coordinates = [56.0093035, 92.87322051104803]

        #Рассчитываем недостающие параметры квартиры - расстояние от центра города и азимут
        flat['Distance'] = list(map(lambda x, y: geodesic(city_center_coordinates, [x, y]).meters, flat['Latitude'], flat['Longitude']))
        flat['Azimuth'] = list(map(lambda x, y: get_azimuth(x, y), flat['Latitude'], flat['Longitude']))
        flat['Distance'] = flat['Distance'].round(0)
        flat['Azimuth'] = flat['Azimuth'].round(0)

        #Удаляем ненужные столбцы с широтой и долготой
        flat = flat.drop('Latitude', axis=1)
        flat = flat.drop('Longitude', axis=1)
        
        rf_model = pickle.load(open('ml_model.sav', 'rb'))

        #Вычисляем предсказанное значение
        rf_prediction_flat = rf_model.predict(flat).round(0)
        result_price = int(rf_prediction_flat[0])

        apartmentInfo = Flat.objects.create(
            address=data['address'],
            area=data['area'],
            floor=data['floor'],
            floorNum=data['floorNum'],
            houseType=data['houseType'],
            countOfRooms=data['countOfRooms'],
            repair=data['repair'],
            district=data['district'],
            price=result_price
        )

        serializer = FlatSerializer(apartmentInfo, many=False)
    if request.method == 'GET':
        apartments = Flat.objects.all()
        print(apartments)
        serializer = FlatSerializer(apartments, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def advertisements(request):
    if request.method == 'GET':
        adverts = Advertisement.objects.all()
        print(adverts)
        serializer = AdvertisementSerializer(adverts, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def address(request):
    if request.method == 'POST':
        data = request.data
        address = "Красноярск " + data['address']
        geolocator = Nominatim(user_agent="hous")
        if geolocator.geocode(address) == None:
            result = []
        else:
            location = geolocator.geocode(address)
            if location == None:
                result = []
            else:
                result = [location.latitude, location.longitude]
        print(address)

    return Response(result)