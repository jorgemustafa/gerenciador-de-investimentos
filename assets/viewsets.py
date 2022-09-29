from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from assets.models.assets import AcaoFii
from assets.models.carteira import Carteira
from assets.serializers import CarteiraSerializer, AcaoFiiSerializer


class CarteiraViewSet(viewsets.ModelViewSet):
    serializer_class = CarteiraSerializer

    def get_queryset(self):
        user = self.request.user
        carteira = Carteira.objects.filter(user=user)
        return carteira


class AcaoFiiViewSet(APIView):
    def get(self, request):
        acoes = AcaoFii.objects.all()
        acoes_serializer = AcaoFiiSerializer(acoes, many=True)
        return Response(acoes_serializer.data)

    def post(self, request):
        acoes_serializer = AcaoFiiSerializer(data=request.data)
        if acoes_serializer.is_valid():
            acoes_serializer.save()
            return Response(200)
        return Response(acoes_serializer.errors)
