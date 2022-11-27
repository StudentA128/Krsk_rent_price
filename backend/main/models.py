from django.db import models


# Create your models here.

class Flat(models.Model):
    address = models.CharField('Адрес', max_length=128)
    area = models.FloatField('Площадь')
    floor = models.IntegerField('Этаж')
    floorNum = models.IntegerField('Этажей в доме')
    houseType = models.CharField('Тип дома', max_length=48)
    countOfRooms = models.IntegerField('Количество комнат')
    repair = models.CharField('Ремонт', max_length=20)
    district = models.CharField('Район', max_length=20)
    price = models.IntegerField('Цена')

class Advertisement(models.Model):
    address = models.CharField('Адрес', max_length=128)
    latitude = models.FloatField('Широта', default=0)
    longitude = models.FloatField('Долгота', default=0)
    area = models.FloatField('Площадь')
    floor = models.IntegerField('Этаж')
    floorNum = models.IntegerField('Этажей в доме')
    houseType = models.CharField('Тип дома', max_length=48)
    countOfRooms = models.IntegerField('Количество комнат')
    repair = models.CharField('Ремонт', max_length=20, default='')
    district = models.CharField('Район', max_length=20, default='')
    price = models.IntegerField('Цена')
    link = models.CharField('Ссылка на объявление', max_length=256)