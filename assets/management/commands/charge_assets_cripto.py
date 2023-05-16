from binance import Client
from django.core.management.base import BaseCommand

from assets.models.assets import ListCriptomoeda


class Command(BaseCommand):
    help = 'Create objs in database getting by binance API'

    def handle(self, *args, **options):
        client = Client(api_key='', api_secret='')
        # get all tickers and prices
        assets = client.get_all_tickers()

        for cripto in assets:
            nome = cripto['symbol']
            if len(nome) <= 10 and 'BRL' in nome:
                nome = nome.replace('BRL', '')
                preco = round(float(cripto['price']), 10)
                ListCriptomoeda.objects.update_or_create(
                    nome=nome,
                    defaults={
                        'preco_fechamento': preco
                    }
                )
        print('criptos cadastradas')
