from rest_framework import generics

from api.models import Teste
from api.serializers import TesteSerializer


class TesteView(generics.CreateAPIView):
    queryset = Teste.objects.all()
    serializer_class = TesteSerializer
