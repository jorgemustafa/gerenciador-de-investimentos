from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from assets.models import AcaoFii
from assets.serializers import AcaoFiiSerializer


@api_view(['GET'])
def listar_acoes(request):
    user = request.user
    acoes = AcaoFii.objects.filter(carteira__user=user)

    return Response({
        'nome': acoes.nome
    })


class ABEFViewSet(viewsets.ModelViewSet):
    serializer_class = AcaoFiiSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = AcaoFii.objects.filter(carteira__user=user)
        return queryset
