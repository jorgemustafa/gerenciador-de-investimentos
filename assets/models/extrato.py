from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

from assets.models.carteira import Carteira


class Extrato(models.Model):
    obj_id = models.PositiveIntegerField()
    obj_tipo = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE, related_name='extrato')
    objeto = GenericForeignKey('obj_tipo', 'obj_id')
    tipo_transacao = models.CharField(max_length=10, choices=[('compra', 'Compra'), ('venda', 'Venda')])
    rentabilidade = models.DecimalField(max_digits=11, decimal_places=2, default=0)
    cotacao = models.DecimalField(max_digits=10, decimal_places=2)
    unidades = models.IntegerField()
    saldo = models.DecimalField(max_digits=15, decimal_places=2)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.objeto.nome if self.objeto else 'Ativo excluído')
