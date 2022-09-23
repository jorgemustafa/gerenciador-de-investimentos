from django.db import models

from auth_users.models import UserAccount


class Carteira(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    valor_total = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.get_valor_carteira()

    def __str__(self):
        return self.user.get_full_name()

    def get_ativos_carteira(self, nome=False):
        categorias = [self.acaofii_set.all()]
        categorias += [self.acaoamericana_set.all()]
        categorias += [self.rendafixa_set.all()]
        categorias += [self.criptomoeda_set.all()]
        categorias += [self.tesourodireto_set.all()]
        categorias += [self.propriedade_set.all()]
        ativos = []
        for categoria in categorias:
            for ativo in categoria:
                if nome:
                    ativos.append(ativo.nome)
                else:
                    ativos.append(ativo)
        return ativos

    def get_valor_carteira(self):
        self.valor_total = 0
        for ativo in self.get_ativos_carteira():
            self.valor_total += ativo.get_valor_investido()
        self.valor_total = float(self.valor_total)
        self.save()
        return self.valor_total

    def get_percentual_categoria(self):
        valor_categoria = {}
        for ativo in self.get_ativos_carteira():
            percentual = (ativo.get_valor_investido() / self.valor_total) * 100
            # verifica se já tem no dict, se tiver adiciona, senão soma
            try:
                if valor_categoria[ativo.__class__._meta.verbose_name_plural]:
                    valor_categoria[ativo.__class__._meta.verbose_name_plural] = valor_categoria[
                                                                                     ativo.__class__._meta.verbose_name_plural] + float(
                        round(percentual, 2))
            except KeyError:
                valor_categoria[ativo.__class__._meta.verbose_name_plural] = float(round(percentual, 2))
        return valor_categoria
