from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models


class Extrato(models.Model):
    obj_id = models.PositiveIntegerField()
    obj_tipo = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    objeto = GenericForeignKey('obj_tipo', 'obj_id')
    tipo_transacao = models.CharField(max_length=10, choices=[('compra', 'Compra'), ('venda', 'Venda')])
    cotacao = models.DecimalField(max_digits=10, decimal_places=2)
    unidades = models.IntegerField()
    saldo = models.DecimalField(max_digits=15, decimal_places=2)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.objeto.nome.nome
