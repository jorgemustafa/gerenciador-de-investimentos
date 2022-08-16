from rest_framework import generics

from assets.models import AcaoFii
from assets.serializers import AcaoFiiSerializer


class AcaoFiiView(generics.CreateAPIView):
    queryset = AcaoFii.objects.all()
    serializer_class = AcaoFiiSerializer
