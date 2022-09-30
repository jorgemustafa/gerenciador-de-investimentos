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

    @staticmethod
    def get_class_and_id(ativo):
        ativo = ativo.__class__.__name__
        id_ativo = None
        class_name = None
        color = None
        if ativo == 'AcaoFii':
            class_name = 'ct-series-a'
            color = 'tertiary'
            id_ativo = 1
        elif ativo == 'AcaoAmericana':
            class_name = 'ct-series-b'
            color = 'twitter'
            id_ativo = 2
        elif ativo == 'RendaFixa':
            class_name = 'ct-series-c'
            color = 'primary'
            id_ativo = 3
        elif ativo == 'TesouroDireto':
            class_name = 'ct-series-d'
            color = 'warning'
            id_ativo = 4
        elif ativo == 'Criptomoeda':
            class_name = 'ct-series-e'
            color = 'quaternary'
            id_ativo = 5
        elif ativo == 'Propriedade':
            class_name = 'ct-series-f'
            color = 'purple'
            id_ativo = 6
        return class_name, color, id_ativo

    def get_percentual_categoria(self):
        valor_categoria = []
        for ativo in self.get_ativos_carteira():
            percentual = (ativo.get_valor_investido() / self.valor_total) * 100
            class_name, color, id_ativo = self.get_class_and_id(ativo)
            ativo_dict = {'id': id_ativo, 'label': ativo.__class__._meta.verbose_name_plural,
                          'value': float(round(percentual, 2)), 'className': class_name, 'color': color}
            # verifica se já tem na lista, se tiver adiciona, senão soma
            if valor_categoria:
                for item in valor_categoria:
                    if item['id'] == ativo_dict['id']:
                        index = valor_categoria.index(item)
                        valor_categoria[index]['value'] += float(round(percentual, 2))
                    else:
                        valor_categoria.append(ativo_dict)
                        break
            else:
                valor_categoria.append(ativo_dict)
        return valor_categoria