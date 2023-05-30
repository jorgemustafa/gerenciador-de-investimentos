from rest_framework import serializers

from assets.models.assets import AcaoFii, Propriedade, Criptomoeda, \
    TesouroDireto, RendaFixa, AcaoAmericana, Carteira, ListAcaoFii, ListAcaoAmericana, ListCriptomoeda
from assets.models.extrato import Extrato


class AcaoFiiSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcaoFii
        fields = '__all__'

    def save(self, **kwargs):
        validated_data = {**self.validated_data, **kwargs}
        unidades_compra = validated_data['unidades']
        cotacao_compra = validated_data['cotacao']
        carteira = validated_data['carteira']

        if self.instance is not None:
            self.instance = self.update(self.instance, validated_data)
        else:
            self.instance = AcaoFii.objects.filter(nome=validated_data['nome'],
                                                   carteira=carteira).last()
            if self.instance:
                # making average price -> total operation + total invested / total units
                pm_atualizado = (float(unidades_compra * cotacao_compra) + self.instance.get_valor_investido()) / (
                            self.instance.unidades + float(unidades_compra))
                validated_data['cotacao'] = pm_atualizado
                validated_data['unidades'] += self.instance.unidades
                self.update(self.instance, validated_data)
            else:
                self.instance = self.create(validated_data)
            Extrato.objects.create(
                objeto=self.instance,
                tipo_transacao='compra',
                unidades=unidades_compra,
                cotacao=cotacao_compra,
                saldo=unidades_compra * cotacao_compra,
                carteira=carteira
            )
        return self.instance


class AcaoAmericanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcaoAmericana
        fields = '__all__'

    def save(self, **kwargs):
        validated_data = {**self.validated_data, **kwargs}
        unidades_compra = validated_data['unidades']
        cotacao_compra = validated_data['cotacao']
        carteira = validated_data['carteira']

        if self.instance is not None:
            self.instance = self.update(self.instance, validated_data)
        else:
            self.instance = AcaoAmericana.objects.filter(nome=validated_data['nome'],
                                                         carteira=carteira).last()
            if self.instance:
                # making average price -> total operation + total invested / total units
                pm_atualizado = (float(unidades_compra * cotacao_compra) + self.instance.get_valor_investido()) / (
                        self.instance.unidades + float(unidades_compra))
                validated_data['cotacao'] = pm_atualizado
                validated_data['unidades'] += self.instance.unidades
                self.update(self.instance, validated_data)
            else:
                self.instance = self.create(validated_data)
            Extrato.objects.create(
                objeto=self.instance,
                tipo_transacao='compra',
                unidades=unidades_compra,
                cotacao=cotacao_compra,
                saldo=unidades_compra * cotacao_compra,
                carteira=carteira
            )
        return self.instance


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

    def save(self, **kwargs):
        validated_data = {**self.validated_data, **kwargs}
        unidades_compra = validated_data['unidades']
        cotacao_compra = validated_data['cotacao']
        carteira = validated_data['carteira']

        if self.instance is not None:
            self.instance = self.update(self.instance, validated_data)
        else:
            self.instance = Criptomoeda.objects.filter(nome=validated_data['nome'],
                                                       carteira=carteira).last()
            if self.instance:
                # making average price -> total operation + total invested / total units
                pm_atualizado = (float(unidades_compra * cotacao_compra) + self.instance.get_valor_investido()) / (
                        float(self.instance.unidades) + float(unidades_compra))
                validated_data['cotacao'] = pm_atualizado
                validated_data['unidades'] += self.instance.unidades
                self.update(self.instance, validated_data)
            else:
                self.instance = self.create(validated_data)
            Extrato.objects.create(
                objeto=self.instance,
                tipo_transacao='compra',
                unidades=unidades_compra,
                cotacao=cotacao_compra,
                saldo=unidades_compra * cotacao_compra,
                carteira=carteira
            )
        return self.instance


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
