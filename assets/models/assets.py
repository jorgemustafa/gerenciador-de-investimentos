from django.db import models, transaction

from assets.models.carteira import Carteira
from assets.models.extrato import Extrato

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


# list models
class ListAcaoFii(models.Model):
    """
    Lista de ativos importados da via API da B3
    """
    nome = models.CharField(max_length=10, verbose_name='Ticker')
    empresa = models.CharField(max_length=50, verbose_name='Nome da Empresa')
    preco_fechamento = models.DecimalField(max_digits=11, decimal_places=2, default=0)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name_plural = 'IP Ações e Fiis'
        verbose_name = 'IP Ação ou Fii'


class ListAcaoAmericana(models.Model):
    """
    Lista de ativos americanos importados da via API do InvestPy
    """
    nome = models.CharField(max_length=10, verbose_name='Ticker')
    empresa = models.CharField(max_length=50, verbose_name='Nome da Empresa')
    preco_fechamento = models.DecimalField(max_digits=11, decimal_places=2, default=0)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name_plural = 'IP Ações Americanas'
        verbose_name = 'IP Ação Americana '


class ListCriptomoeda(models.Model):
    """
    Lista de criptomoedas importados da via API do InvestPy
    """
    nome = models.CharField(max_length=10, verbose_name='Ticker')
    preco_fechamento = models.DecimalField(max_digits=11, decimal_places=2, default=0)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name_plural = 'IP Criptomoedas'
        verbose_name = 'IP Criptomoedas'


# usable models
class AcaoFii(models.Model):
    """
    Ações ou FIIs
    """
    nome = models.ForeignKey(ListAcaoFii, on_delete=models.CASCADE, verbose_name='Ticker')
    cotacao = models.DecimalField(max_digits=11, decimal_places=2)
    data_operacao = models.DateField()
    unidades = models.IntegerField()
    taxa = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome.nome

    def get_valor_investido(self):
        return float(self.unidades * self.cotacao)

    def get_percentual_carteira(self):
        percentual = round(self.get_desempenho(total=True) * 100 / self.carteira.get_total_atual(), 3)
        if percentual >= 0:
            return percentual
        return 0

    def get_desempenho(self, percentual=False, total=False):
        lucro = (self.nome.preco_fechamento - self.cotacao) * self.unidades
        if percentual:
            lucro = float(lucro) / self.get_valor_investido() * 100
        if total:
            lucro = self.cotacao * self.unidades + lucro
        return round(float(lucro), 2)

    def get_preco_medio(self):
        return self.cotacao

    def get_unidades(self):
        return self.unidades

    class Meta:
        verbose_name_plural = 'Ações e FIIs'
        verbose_name = 'Ação e FII'


class AcaoAmericana(models.Model):
    nome = models.ForeignKey(ListAcaoAmericana, on_delete=models.CASCADE, verbose_name='Ticker')
    cotacao = models.DecimalField(max_digits=11, decimal_places=2)  # em dólar
    data_operacao = models.DateField()
    unidades = models.DecimalField(max_digits=11, decimal_places=2)
    taxa = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome.nome

    def get_valor_investido(self):
        return float(self.unidades * self.cotacao)

    def get_percentual_carteira(self):
        percentual = round(self.get_desempenho(total=True) * 100 / self.carteira.get_total_atual(), 3)
        if percentual >= 0:
            return percentual
        return 0

    def get_desempenho(self, percentual=False, total=False):
        lucro = (self.nome.preco_fechamento - self.cotacao) * self.unidades
        if percentual:
            lucro = float(lucro) / self.get_valor_investido() * 100
        return round(float(lucro), 2)

    def get_preco_medio(self):
        return self.cotacao

    def get_unidades(self):
       return self.unidades

    class Meta:
        verbose_name_plural = 'Ações Americanas'


class RendaFixa(models.Model):
    PRODUTO_CHOICES = [
        ('CDB', 'CDB'),
        ('RDB', 'RDB'),
        ('LC', 'LC'),
        ('LCI', 'LCI'),
        ('LCA', 'LCA'),
        ('LIG', 'LIG'),
        ('CPR', 'CPR'),
        ('CRI', 'CRI'),
        ('CRA', 'CRA'),
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
        return f'{self.nome} {self.emissor} {self.tipo_aplicacao} {self.rentabilidade}%'

    def get_valor_investido(self):
        return float(self.valor_investido)

    def get_percentual_carteira(self):
        percentual = round(self.get_desempenho(total=True) * 100 / self.carteira.get_total_atual(), 3)
        if percentual >= 0:
            return percentual
        return 0

    @staticmethod
    def get_desempenho(percentual=False, total=False):
        return 0

    def get_preco_medio(self):
        return self.valor_investido

    @staticmethod
    def get_unidades():
       return 1

    class Meta:
        verbose_name_plural = 'Rendas Fixas'

    @transaction.atomic
    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
        if created:
            Extrato.objects.create(
                objeto=self,
                tipo_transacao='compra',
                unidades=1,
                cotacao=self.valor_investido,
                rentabilidade=self.rentabilidade,
                saldo=self.valor_investido,
                carteira=self.carteira
            )


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

    def get_percentual_carteira(self):
        percentual = round(self.get_desempenho(total=True) * 100 / self.carteira.get_total_atual(), 3)
        if percentual >= 0:
            return percentual
        return 0

    @staticmethod
    def get_desempenho(percentual=False, total=False):
        return 0

    def get_preco_medio(self):
        return self.valor_investido

    @staticmethod
    def get_unidades():
       return 1

    class Meta:
        verbose_name_plural = 'Tesouros Diretos'

    @transaction.atomic
    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
        if created:
            Extrato.objects.create(
                objeto=self,
                tipo_transacao='compra',
                unidades=1,
                cotacao=self.valor_investido,
                rentabilidade=self.rentabilidade,
                saldo=self.valor_investido,
                carteira=self.carteira
            )


class Criptomoeda(models.Model):
    nome = models.ForeignKey(ListCriptomoeda, on_delete=models.CASCADE, verbose_name='Ticker')
    data_operacao = models.DateField()
    cotacao = models.DecimalField(max_digits=11, decimal_places=2)
    unidades = models.DecimalField(max_digits=13, decimal_places=10)
    taxa = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome.nome

    def get_valor_investido(self):
        return float(self.unidades * self.cotacao)

    def get_percentual_carteira(self):
        percentual = round(self.get_desempenho(total=True) * 100 / self.carteira.get_total_atual(), 3)
        if percentual >= 0:
            return percentual
        return 0

    @staticmethod
    def get_desempenho(percentual=False, total=False):
        return 0

    def get_preco_medio(self):
        return self.cotacao

    def get_unidades(self):
       return self.unidades

    class Meta:
        verbose_name_plural = 'Criptomoedas'


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

    def get_percentual_carteira(self):
        percentual = round(self.get_desempenho(total=True) * 100 / self.carteira.get_total_atual(), 3)
        if percentual >= 0:
            return percentual
        return 0

    @staticmethod
    def get_desempenho(percentual=False, total=False):
        return 0

    def get_preco_medio(self):
        return self.valor_investido

    @staticmethod
    def get_unidades():
       return 1

    class Meta:
        verbose_name_plural = 'Propriedades'

    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
        if created:
            Extrato.objects.create(
                objeto=self,
                tipo_transacao='compra',
                unidades=1,
                cotacao=self.valor_investido,
                saldo=self.valor_investido,
                carteira=self.carteira
            )
