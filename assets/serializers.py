from rest_framework import serializers

from assets.models.assets import AcaoFii, Propriedade, Criptomoeda, \
    TesouroDireto, RendaFixa, AcaoAmericana, Carteira, ListAcaoFii, ListAcaoAmericana, ListCriptomoeda
from assets.models.extrato import Extrato


class AcaoFiiSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcaoFii
        fields = '__all__'


class AcaoAmericanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcaoAmericana
        fields = '__all__'


class RendaFixaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RendaFixa
        fields = '__all__'


class TesouroDiretoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TesouroDireto
        fields = '__all__'


class CriptomoedaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Criptomoeda
        fields = '__all__'


class PropriedadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propriedade
        fields = '__all__'


class CarteiraSerializer(serializers.ModelSerializer):
    assets = serializers.ReadOnlyField(source='get_percentual_categoria')

    class Meta:
        model = Carteira
        fields = '__all__'


class B3AcaoFiiSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListAcaoFii
        fields = '__all__'

        def __init__(self, request):
            self.fields['id'] = request


class ListAcaoAmericanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListAcaoAmericana
        fields = '__all__'

        def __init__(self, request):
            self.fields['id'] = request


class ListCriptoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListCriptomoeda
        fields = '__all__'

        def __init__(self, request):
            self.fields['id'] = request


class ExtratoSerializer(serializers.ModelSerializer):
    nome = serializers.ReadOnlyField(source='__str__')
    inclusao = serializers.DateTimeField(format='%d/%m/%Y')

    class Meta:
        model = Extrato
        fields = '__all__'
