from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from assets.models.assets import AcaoFii, AcaoAmericana, RendaFixa, TesouroDireto, Criptomoeda, Propriedade
from assets.models.carteira import Carteira
from assets.serializers import AcaoFiiSerializer, AcaoAmericanaSerializer, PropriedadeSerializer, \
    CriptomoedaSerializer, TesouroDiretoSerializer, RendaFixaSerializer, CarteiraSerializer


class CarteiraViewSet(viewsets.ModelViewSet):
    serializer_class = CarteiraSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Carteira.objects.filter(user=user)
        return queryset


class AcaoFiiViewSet(viewsets.ModelViewSet):
    serializer_class = AcaoFiiSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = AcaoFii.objects.filter(carteira__user=user)
        return queryset


class AcaoAmericanaViewSet(viewsets.ModelViewSet):
    serializer_class = AcaoAmericanaSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = AcaoAmericana.objects.filter(carteira__user=user)
        return queryset


class RendaFixaViewSet(viewsets.ModelViewSet):
    serializer_class = RendaFixaSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = RendaFixa.objects.filter(carteira__user=user)
        return queryset


class TesouroDiretoViewSet(viewsets.ModelViewSet):
    serializer_class = TesouroDiretoSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = TesouroDireto.objects.filter(carteira__user=user)
        return queryset


class CriptomoedaViewSet(viewsets.ModelViewSet):
    serializer_class = CriptomoedaSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Criptomoeda.objects.filter(carteira__user=user)
        return queryset


class PropriedadeViewSet(viewsets.ModelViewSet):
    serializer_class = PropriedadeSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Propriedade.objects.filter(carteira__user=user)
        return queryset
