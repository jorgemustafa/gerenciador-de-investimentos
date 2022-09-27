from rest_framework import serializers

from assets.models.assets import AcaoFii, Propriedade, Criptomoeda, TesouroDireto, RendaFixa, AcaoAmericana, Carteira


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
    # criptomoeda = CriptomoedaSerializer(many=True) puxar cripto atraves da carteira

    class Meta:
        model = Carteira
        fields = '__all__'
