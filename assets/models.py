from django.db import models

from auth_users.models import UserAccount

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


class Carteira(models.Model):
    nome = models.CharField(max_length=64)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.nome} de {self.user.get_full_name()}'


class AcaoFii(models.Model):
    """
    Ações, BDRs, ETFs ou FIIs
    """
    nome = models.CharField(max_length=64)
    cotacao = models.DecimalField(max_digits=11, decimal_places=2)
    data_operacao = models.DateField()
    unidades = models.DecimalField(max_digits=11, decimal_places=2)
    taxa = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name_plural = 'Ações, BDRs, ETFs ou FIIs'
        verbose_name = 'Ação, BDR, ETF ou FII'


class AcaoAmericana(models.Model):
    nome = models.CharField(max_length=64)
    cotacao = models.DecimalField(max_digits=11, decimal_places=2)  # em dólar
    data_operacao = models.DateField()
    unidades = models.DecimalField(max_digits=11, decimal_places=2)
    taxa = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name_plural = 'Ações Americanas'


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

    produto = models.CharField(max_length=3, choices=PRODUTO_CHOICES)
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
        return self.produto

    class Meta:
        verbose_name_plural = 'Rendas Fixas'


class TesouroDireto(models.Model):
    nome = models.CharField(max_length=64)
    data_operacao = models.DateField()
    valor_investido = models.DecimalField(max_digits=11, decimal_places=2)
    unidades = models.DecimalField(max_digits=11, decimal_places=2)
    tipo_aplicacao = models.CharField(max_length=6, choices=TIPO_APLICACAO_CHOICES)
    rentabilidade = models.DecimalField(max_digits=11, decimal_places=2)
    vencimento = models.DateField()
    taxa = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name_plural = 'Tesouros Diretos'


class Criptomoeda(models.Model):
    nome = models.CharField(max_length=64)
    data_operacao = models.DateField()
    cotacao = models.DecimalField(max_digits=11, decimal_places=2)
    unidades = models.DecimalField(max_digits=11, decimal_places=2)
    taxa = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name_plural = 'Criptomoedas'


class Propriedade(models.Model):
    descricao = models.TextField(max_length=200)
    data_operacao = models.DateField()
    valor_investido = models.DecimalField(max_digits=11, decimal_places=2)
    taxa = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.CASCADE)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.descricao

    class Meta:
        verbose_name_plural = 'Propriedades'
