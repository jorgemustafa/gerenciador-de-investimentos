from django.urls import path

from .viewsets import CarteiraViewSet, AcaoFiiViewSet, AcaoAmViewSet

urlpatterns = [
    path('acaofii/', AcaoFiiViewSet.as_view(), name='acaofii'),
    path('acaoam/', AcaoAmViewSet.as_view(), name='acaoam'),
    # path('fixa/', RendaFixaViewSet.as_view(), name='listar_rendas_fixas'),
    # path('tesouro/', TesouroDiretoViewSet.as_view(), name='listar_tesouros_diretos'),
    # path('criptomoeda/', CriptomoedaViewSet.as_view(), name='listar_criptomoedas'),
    # path('propriedade/', PropriedadeViewSet.as_view(), name='listar_propriedades'),
    path('carteira/', CarteiraViewSet.as_view({'get': 'list'}), name='carteira_viewset'),
]
