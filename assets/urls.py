from django.urls import path

from .viewsets import CarteiraViewSet, AcaoFiiViewSet, AcaoAmViewSet, RendaFixaViewSet, TesouroDiretoViewSet, \
    CriptomoedaViewSet, PropriedadeViewSet, AssetsList, B3AcaoFiiList, DesempenhoViewSet, AcaoAmericanaList

urlpatterns = [
    # crud ativos da carteira
    path('acaofii/', AcaoFiiViewSet.as_view(), name='acaofii'),
    path('list/', AssetsList.as_view(), name='assets_list'),
    path('acaoam/', AcaoAmViewSet.as_view(), name='acaoam'),
    path('fixa/', RendaFixaViewSet.as_view(), name='rendafixa'),
    path('tesouro/', TesouroDiretoViewSet.as_view(), name='tesouro'),
    path('criptomoeda/', CriptomoedaViewSet.as_view(), name='criptomoeda'),
    path('propriedade/', PropriedadeViewSet.as_view(), name='listar_propriedades'),
    # views para plotagem de gráficos
    path('carteira/', CarteiraViewSet.as_view({'get': 'list'}), name='carteira_viewset'),
    path('desempenho/', DesempenhoViewSet.as_view(), name='desempenho_viewset'),
    # listagem dos ativos importados via api
    path('list/b3/', B3AcaoFiiList.as_view(), name='b3acaofii_list'),
    path('list/am/', AcaoAmericanaList.as_view(), name='am_list'),
]
