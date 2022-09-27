from rest_framework import viewsets

from assets.models.carteira import Carteira
from assets.serializers import CarteiraSerializer


class CarteiraViewSet(viewsets.ModelViewSet):
    serializer_class = CarteiraSerializer

    def get_queryset(self):
        user = self.request.user
        carteira = Carteira.objects.filter(user=user)
        return carteira
