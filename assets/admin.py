from django.contrib import admin

from assets.models import AcaoFii, AcaoAmericana, RendaFixa, TesouroDireto, Criptomoeda, Propriedade


@admin.register(AcaoFii)
class AcaoFiiAdmin(admin.ModelAdmin):
    list_display = ['nome', 'cotacao', 'unidades', 'taxa']
    readonly_fields = ['inclusao']


@admin.register(AcaoAmericana)
class AcaoAmericanaAdmin(admin.ModelAdmin):
    list_display = ['nome', 'cotacao', 'unidades', 'taxa']
    readonly_fields = ['inclusao']


@admin.register(RendaFixa)
class RendaFixaAdmin(admin.ModelAdmin):
    list_display = ['produto', 'emissor', 'valor_investido', 'tipo_aplicacao', 'rentabilidade', 'liquidez',
                    'vencimento', 'taxa']
    readonly_fields = ['inclusao']


@admin.register(TesouroDireto)
class TesouroDiretoAdmin(admin.ModelAdmin):
    list_display = ['nome', 'valor_investido', 'unidades', 'tipo_aplicacao', 'rentabilidade',
                    'vencimento', 'taxa']
    readonly_fields = ['inclusao']


@admin.register(Criptomoeda)
class CriptomoedaAdmin(admin.ModelAdmin):
    list_display = ['nome', 'data_operacao', 'cotacao', 'unidades', 'taxa']
    readonly_fields = ['inclusao']


@admin.register(Propriedade)
class PropriedadeAdmin(admin.ModelAdmin):
    list_display = ['descricao', 'data_operacao', 'valor_investido', 'taxa']
    readonly_fields = ['inclusao']
