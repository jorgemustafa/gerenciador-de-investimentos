from django.urls import path

from .viewsets import CarteiraViewSet, AcaoFiiViewSet, AcaoAmViewSet, RendaFixaViewSet, TesouroDiretoViewSet, \
    CriptomoedaViewSet, PropriedadeViewSet, AssetsList

urlpatterns = [
    path('acaofii/', AcaoFiiViewSet.as_view(), name='acaofii'),
    path('list/', AssetsList.as_view(), name='assets_list'),
    path('acaoam/', AcaoAmViewSet.as_view(), name='acaoam'),
    path('fixa/', RendaFixaViewSet.as_view(), name='rendafixa'),
    path('tesouro/', TesouroDiretoViewSet.as_view(), name='tesouro'),
    path('criptomoeda/', CriptomoedaViewSet.as_view(), name='criptomoeda'),
    path('propriedade/', PropriedadeViewSet.as_view(), name='listar_propriedades'),
    path('carteira/', CarteiraViewSet.as_view({'get': 'list'}), name='carteira_viewset'),
]
