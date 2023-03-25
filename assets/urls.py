from django.urls import path

from .viewsets import CarteiraViewSet, AcaoFiiViewSet, AcaoAmViewSet, RendaFixaViewSet, TesouroDiretoViewSet, \
    CriptomoedaViewSet, PropriedadeViewSet, AssetsList, B3AcaoFiiList, DesempenhoViewSet, AcaoAmericanaList, \
    ExtratoViewSet, CriptoList, GenerateReportView, DownloadReportView

urlpatterns = [
    # crud ativos da carteira
    path('acaofii/', AcaoFiiViewSet.as_view(), name='acaofii'),
    path('acaoam/', AcaoAmViewSet.as_view(), name='acaoam'),
    path('fixa/', RendaFixaViewSet.as_view(), name='rendafixa'),
    path('tesouro/', TesouroDiretoViewSet.as_view(), name='tesouro'),
    path('criptomoeda/', CriptomoedaViewSet.as_view(), name='criptomoeda'),
    path('propriedade/', PropriedadeViewSet.as_view(), name='propriedade'),
    # views para plotagem de gráficos
    path('carteira/', CarteiraViewSet.as_view({'get': 'list'}), name='carteira_viewset'),
    path('desempenho/', DesempenhoViewSet.as_view(), name='desempenho_viewset'),
    # listagem dos objetos
    path('list/', AssetsList.as_view(), name='assets_list'),
    path('list/b3/', B3AcaoFiiList.as_view(), name='b3acaofii_list'),
    path('list/am/', AcaoAmericanaList.as_view(), name='am_list'),
    path('list/cripto/', CriptoList.as_view(), name='cripto_list'),
    path('list/extrato/', ExtratoViewSet.as_view(), name='transactions_list'),
    # relatorio
    path('exportar/', GenerateReportView.as_view()),
    path('baixar/', DownloadReportView.as_view())
]
