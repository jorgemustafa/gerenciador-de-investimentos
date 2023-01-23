from django.core.exceptions import ValidationError
from django.db import models

from assets.models.carteira import Carteira

TIPO_APLICACAO_CHOICES = [
    ('pre', 'PRÉ'),
    ('cdi', 'CDI'),
    ('cdi+', 'CDI+'),
    ('ipca+', 'IPCA+'),
    ('selic', 'SELIC'),
    ('selic+', 'SELIC+'),
    ('igpm+', 'IGPM+'),
    ('igpdi+', 'IGPDI+'),
]


class AcaoFii(models.Model):
    """
    Ações ou FIIs
    """
    nome = models.CharField(max_length=64, verbose_name='Código')
    cotacao = models.DecimalField(max_digits=11, decimal_places=2)
    data_operacao = models.DateField()
    unidades = models.DecimalField(max_digits=11, decimal_places=2)
    taxa = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    def get_valor_investido(self):
        return float(self.unidades * self.cotacao)

    class Meta:
        verbose_name_plural = 'Ações e FIIs'
        verbose_name = 'Ação e FII'

    def save(self, *args, **kwargs):
        my_assets = self.carteira.get_ativos_carteira()
        if self.nome in my_assets.__str__():
            raise ValidationError(
                message='O ativo que tentou cadastrar já existe em sua carteira, adicione novos aportes em Reinvestimentos',
                code=400
            )
        super(AcaoFii, self).save(*args, **kwargs)


class AcaoAmericana(models.Model):
    nome = models.CharField(max_length=64, verbose_name='Código')
    cotacao = models.DecimalField(max_digits=11, decimal_places=2)  # em dólar
    data_operacao = models.DateField()
    unidades = models.DecimalField(max_digits=11, decimal_places=2)
    taxa = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    def get_valor_investido(self):
        return float(self.unidades * self.cotacao)

    class Meta:
        verbose_name_plural = 'Ações Americanas'

    def save(self, *args, **kwargs):
        my_assets = self.carteira.get_ativos_carteira()
        if self.nome in my_assets.__str__():
            raise ValidationError(
                message='O ativo que tentou cadastrar já existe em sua carteira, adicione novos aportes em Reinvestimentos',
                code=400
            )
        super(AcaoAmericana, self).save(*args, **kwargs)


class RendaFixa(models.Model):
    PRODUTO_CHOICES = [
        ('cdb', 'CDB'),
        ('rdb', 'RDB'),
        ('lc', 'LC'),
        ('lci', 'LCI'),
        ('lca', 'LCA'),
        ('lig', 'LIG'),
        ('cpr', 'CPR'),
        ('cri', 'CRI'),
        ('cra', 'CRA'),
    ]

    nome = models.CharField(max_length=3, choices=PRODUTO_CHOICES, verbose_name='Produto')
    emissor = models.CharField(max_length=64)
    data_operacao = models.DateField()
    valor_investido = models.DecimalField(max_digits=11, decimal_places=2)
    tipo_aplicacao = models.CharField(max_length=6, choices=TIPO_APLICACAO_CHOICES)
    rentabilidade = models.DecimalField(max_digits=11, decimal_places=2)
    vencimento = models.DateField()
    liquidez = models.CharField(max_length=64)
    taxa = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    def get_valor_investido(self):
        return float(self.valor_investido)

    class Meta:
        verbose_name_plural = 'Rendas Fixas'

    def save(self, *args, **kwargs):
        my_assets = self.carteira.get_ativos_carteira()
        if self.nome in my_assets.__str__():
            raise ValidationError(
                message='O ativo que tentou cadastrar já existe em sua carteira, adicione novos aportes em Reinvestimentos',
                code=400
            )
        super(RendaFixa, self).save(*args, **kwargs)


class TesouroDireto(models.Model):
    nome = models.CharField(max_length=64, verbose_name='Nome do Título')
    data_operacao = models.DateField()
    valor_investido = models.DecimalField(max_digits=11, decimal_places=2)
    tipo_aplicacao = models.CharField(max_length=6, choices=TIPO_APLICACAO_CHOICES)
    rentabilidade = models.DecimalField(max_digits=11, decimal_places=2)
    vencimento = models.DateField()
    taxa = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    def get_valor_investido(self):
        return float(self.valor_investido)

    class Meta:
        verbose_name_plural = 'Tesouros Diretos'

    def save(self, *args, **kwargs):
        my_assets = self.carteira.get_ativos_carteira()
        if self.nome in my_assets.__str__():
            raise ValidationError(
                message='O ativo que tentou cadastrar já existe em sua carteira, adicione novos aportes em Reinvestimentos',
                code=400
            )
        super(TesouroDireto, self).save(*args, **kwargs)


class Criptomoeda(models.Model):
    nome = models.CharField(max_length=64)
    data_operacao = models.DateField()
    cotacao = models.DecimalField(max_digits=11, decimal_places=2)
    unidades = models.DecimalField(max_digits=13, decimal_places=10)
    taxa = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    def get_valor_investido(self):
        return float(self.unidades * self.cotacao)

    class Meta:
        verbose_name_plural = 'Criptomoedas'

    def save(self, *args, **kwargs):
        my_assets = self.carteira.get_ativos_carteira()
        if self.nome in my_assets.__str__():
            raise ValidationError(
                message='O ativo que tentou cadastrar já existe em sua carteira, adicione novos aportes em Reinvestimentos',
                code=400
            )
        super(Criptomoeda, self).save(*args, **kwargs)


class Propriedade(models.Model):
    nome = models.TextField(max_length=200, verbose_name='Descrição')
    data_operacao = models.DateField()
    valor_investido = models.DecimalField(max_digits=11, decimal_places=2)
    taxa = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    def get_valor_investido(self):
        return float(self.valor_investido)

    class Meta:
        verbose_name_plural = 'Propriedades'

    def save(self, *args, **kwargs):
        my_assets = self.carteira.get_ativos_carteira()
        if self.nome in my_assets.__str__():
            raise ValidationError(
                message='O ativo que tentou cadastrar já existe em sua carteira, adicione novos aportes em Reinvestimentos',
                code=400
            )
        super(Propriedade, self).save(*args, **kwargs)
