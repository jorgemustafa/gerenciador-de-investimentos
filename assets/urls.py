from django.urls import path

from .views import listar_acoes, ABEFViewSet

urlpatterns = [
    path('abef/', ABEFViewSet.as_view({'get': 'list'}), name='listar_acoes'),
]
