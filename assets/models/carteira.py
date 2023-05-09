from django.db import models

from auth_users.models import UserAccount


class Carteira(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    valor_total = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    desempenho = models.DecimalField(max_digits=4, decimal_places=2, default=0)
    inclusao = models.DateTimeField(auto_now_add=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.pk:
            self.get_valor_carteira()

    def __str__(self):
        return self.user.email

    def get_ativos_carteira(self, json=False, unique=False):
        categorias = [self.acaofii_set.all()]
        categorias += [self.acaoamericana_set.all()]
        categorias += [self.rendafixa_set.all()]
        categorias += [self.criptomoeda_set.all()]
        categorias += [self.tesourodireto_set.all()]
        categorias += [self.propriedade_set.all()]
        ativos = []
        for categoria in categorias:
            for ativo in categoria:
                if json:
                    try:
                        ativos.append({
                            'id': ativo.nome.id,
                            'name': str(ativo),
                            'pm': ativo.get_preco_medio(),
                            'units': ativo.get_unidades(),
                            'total_current': ativo.get_desempenho(total=True),
                            'invested': ativo.get_valor_investido(),
                            'performance': ativo.get_desempenho(percentual=True),
                            'perc_wallet': ativo.get_percentual_carteira(),
                            'type': str(ativo.__class__.__name__),
                        })
                    except AttributeError:
                        ativos.append({
                            'id': int(ativo.id),
                            'name': str(ativo),
                            'pm': ativo.get_preco_medio(),
                            'units': ativo.get_unidades(),
                            'total_current': ativo.get_desempenho(total=True),
                            'invested': ativo.get_valor_investido(),
                            'performance': ativo.get_desempenho(percentual=True),
                            'perc_wallet': ativo.get_percentual_carteira(),
                            'type': str(ativo.__class__.__name__),
                        })
                else:
                    ativos.append(ativo)
        return ativos

    def get_valor_carteira(self):
        self.valor_total = 0
        for ativo in self.get_ativos_carteira():
            self.valor_total += ativo.get_valor_investido()
        self.valor_total = float(self.valor_total)
        self.save()
        return round(self.valor_total, 2)

    def get_desempenho(self):
        todos_ativos = self.get_ativos_carteira()
        carteira_stocks = []
        carteira_acoes_fiis = []
        carteira_criptos = []

        for ativo in todos_ativos:
            classe = ativo.__class__.__name__
            if classe == 'AcaoFii':
                carteira_acoes_fiis.append(ativo)
            if classe == 'AcaoAmericana':
                carteira_stocks.append(ativo)
            if classe == 'Criptomoeda':
                carteira_criptos.append(ativo)

        desempenho = self.get_desempenho_percent_valor(carteira_acoes_fiis)
        desempenho2 = self.get_desempenho_percent_valor(carteira_stocks)
        # desempenho += self.get_desempenho_cripto(carteira_acoes_fiis)
        desempenho_geral = {k: desempenho.get(k, 0) + desempenho2.get(k, 0) for k in set(desempenho) & set(desempenho2)}
        desempenho_geral['percent'] = round(desempenho_geral['percent'], 2)
        self.desempenho = desempenho_geral.get('percent')
        self.save()
        return desempenho_geral

    def get_desempenho_percent_valor(self, carteira):
        valor = 0
        for ativo in carteira:
            valor += (ativo.nome.preco_fechamento - ativo.cotacao) * ativo.unidades
        percentual = float(valor) / self.get_valor_carteira() * 100 if self.get_valor_carteira() else 0
        desempenho = {'value': round(valor, 2), 'percent': round(percentual, 2)}
        return desempenho

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
                          'value': percentual, 'className': class_name, 'color': color}
            # verifica se já tem na lista, se tiver soma, senão adiciona
            if valor_categoria:
                for index, item in enumerate(valor_categoria):
                    if item['id'] == ativo_dict['id']:
                        valor_categoria[index]['value'] += percentual
                    elif index == len(valor_categoria) - 1:
                        valor_categoria.append(ativo_dict)
                        break
            else:
                valor_categoria.append(ativo_dict)
        # round percents
        for classe in valor_categoria:
            classe['value'] = round(classe['value'], 2)
        return valor_categoria
