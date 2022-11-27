from django.urls import path
from . import views


urlpatterns = [
    path('info', views.info, name='apartmentInfo'),
    path('advertisements', views.advertisements, name='advertisements'),
    path('address', views.address, name='address'),
]
