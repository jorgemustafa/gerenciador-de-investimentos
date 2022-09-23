from django.urls import path

from .viewsets import *

urlpatterns = [
    path('abef/', AcaoFiiViewSet.as_view({'get': 'list'}), name='listar_abef'),
    path('stock/', AcaoAmericanaViewSet.as_view({'get': 'list'}), name='listar_acoes_americanas'),
    path('fixa/', RendaFixaViewSet.as_view({'get': 'list'}), name='listar_rendas_fixas'),
    path('tesouro/', TesouroDiretoViewSet.as_view({'get': 'list'}), name='listar_tesouros_diretos'),
    path('criptomoeda/', CriptomoedaViewSet.as_view({'get': 'list'}), name='listar_criptomoedas'),
    path('propriedade/', PropriedadeViewSet.as_view({'get': 'list'}), name='listar_propriedades'),
    path('carteira/', CarteiraViewSet.as_view({'get': 'list'}), name='carteira_viewset'),
]
