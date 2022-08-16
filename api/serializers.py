from rest_framework import serializers

from api.models import Teste


class TesteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teste
        fields = '__all__'
