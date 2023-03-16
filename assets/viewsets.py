from django.core.exceptions import ValidationError
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from assets.models.assets import AcaoFii, AcaoAmericana, RendaFixa, TesouroDireto, Criptomoeda, Propriedade, \
    ListAcaoFii, ListAcaoAmericana, ListCriptomoeda
from assets.models.carteira import Carteira
from assets.models.extrato import Extrato
from assets.serializers import CarteiraSerializer, AcaoFiiSerializer, AcaoAmericanaSerializer, RendaFixaSerializer, \
    TesouroDiretoSerializer, CriptomoedaSerializer, PropriedadeSerializer, B3AcaoFiiSerializer, \
    ListAcaoAmericanaSerializer, ExtratoSerializer, ListCriptoSerializer
from assets.utils import sell_assets


class CarteiraViewSet(viewsets.ModelViewSet):
    serializer_class = CarteiraSerializer

    def get_queryset(self):
        user = self.request.user
        if not user.carteira_set.all():
            Carteira.objects.update_or_create(user=user)
        return Carteira.objects.filter(user=user)


class AcaoFiiViewSet(APIView):
    def get(self, request):
        acoes = AcaoFii.objects.all()
        acoes_serializer = AcaoFiiSerializer(acoes, many=True)
        return Response(acoes_serializer.data)

    def post(self, request):
        if request.data['venda']:
            criado = sell_assets(request, AcaoFii)
            if criado:
                return Response(200)
            return Response(400)

        acoes_serializer = AcaoFiiSerializer(data=request.data)
        if acoes_serializer.is_valid():
            acoes_serializer.save()
            return Response(200)
        return Response(acoes_serializer.errors)


class AcaoAmViewSet(APIView):
    def get(self, request):
        acoes_am = AcaoAmericana.objects.all()
        acoes_am_serializer = AcaoAmericanaSerializer(acoes_am, many=True)
        return Response(acoes_am_serializer.data)

    def post(self, request):
        if request.data['venda']:
            criado = sell_assets(request, AcaoAmericana)
            if criado:
                return Response(200)
            return Response(400)

        acoes_am_serializer = AcaoAmericanaSerializer(data=request.data)
        if acoes_am_serializer.is_valid():
            acoes_am_serializer.save()
            return Response(200)
        return Response(acoes_am_serializer.errors)


class RendaFixaViewSet(APIView):
    def get(self, request):
        renda_fixa = RendaFixa.objects.all()
        renda_fixa_serializer = RendaFixaSerializer(renda_fixa, many=True)
        return Response(renda_fixa_serializer.data)

    def post(self, request):
        renda_fixa_serializer = RendaFixaSerializer(data=request.data)
        if renda_fixa_serializer.is_valid():
            renda_fixa_serializer.save()
            return Response(200)
        return Response(renda_fixa_serializer.errors)


class TesouroDiretoViewSet(APIView):
    def get(self, request):
        tesouro = TesouroDireto.objects.all()
        tesouro_serializer = TesouroDiretoSerializer(tesouro, many=True)
        return Response(tesouro_serializer.data)

    def post(self, request):
        tesouro_serializer = TesouroDiretoSerializer(data=request.data)
        if tesouro_serializer.is_valid():
            tesouro_serializer.save()
            return Response(200)
        return Response(tesouro_serializer.errors)


class CriptomoedaViewSet(APIView):
    def get(self, request):
        cripto = Criptomoeda.objects.all()
        cripto_serializer = CriptomoedaSerializer(cripto, many=True)
        return Response(cripto_serializer.data)

    def post(self, request):
        if request.data['venda']:
            criado = sell_assets(request, Criptomoeda)
            if criado:
                return Response(200)
            return Response(400)

        cripto_serializer = CriptomoedaSerializer(data=request.data)
        if cripto_serializer.is_valid():
            try:
                cripto_serializer.save()
                return Response(200)
            except ValidationError as msg:
                return Response({'message': msg.message}, 400)
        return Response(cripto_serializer.errors)


class PropriedadeViewSet(APIView):
    def get(self, request):
        prop = Propriedade.objects.all()
        prop_serializer = PropriedadeSerializer(prop, many=True)
        return Response(prop_serializer.data)

    def post(self, request):
        prop_serializer = PropriedadeSerializer(data=request.data)
        if prop_serializer.is_valid():
            prop_serializer.save()
            return Response(200)
        return Response(prop_serializer.errors)


class AssetsList(APIView):
    def get(self, request):
        assets = Carteira.objects.get(user=request.user).get_ativos_carteira(json=True, unique=True)
        return Response(assets)


class B3AcaoFiiList(APIView):
    def get(self, request):
        b3af = ListAcaoFii.objects.all()
        b3af_serializer = B3AcaoFiiSerializer(b3af, many=True)
        return Response(b3af_serializer.data)


class AcaoAmericanaList(APIView):
    def get(self, request):
        am = ListAcaoAmericana.objects.all()
        am_serializer = ListAcaoAmericanaSerializer(am, many=True)
        return Response(am_serializer.data)


class CriptoList(APIView):
    def get(self, request):
        cripto = ListCriptomoeda.objects.all()
        cripto_serializer = ListCriptoSerializer(cripto, many=True)
        return Response(cripto_serializer.data)


class DesempenhoViewSet(APIView):
    def get(self, request):
        carteira = request.user.carteira_set.get()
        desempenho = carteira.get_desempenho()
        return Response(desempenho)


class ExtratoViewSet(APIView):
    def get(self, request):
        extrato = Extrato.objects.all().order_by('-inclusao')
        extrato_serializer = ExtratoSerializer(extrato, many=True)
        return Response(extrato_serializer.data)
