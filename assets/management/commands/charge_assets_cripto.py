from binance import Client
from django.core.management.base import BaseCommand

from assets.models.assets import ListCriptomoeda
from engine.settings import BINANCE_KEY, BINANCE_SECRET


class Command(BaseCommand):
    help = 'Create objs in database getting by binance API'

    def handle(self, *args, **options):
        ListCriptomoeda.objects.all().delete()
        client = Client(api_key=BINANCE_KEY, api_secret=BINANCE_SECRET)
        # get all tickers and prices
        assets = client.get_all_tickers()

        for cripto in assets:
            nome = cripto['symbol']
            if len(nome) <= 10 and 'BRL' in nome:
                nome = nome.replace('BRL', '')
                preco = round(float(cripto['price']), 10)
                ListCriptomoeda.objects.create(nome=nome, preco_fechamento=preco)
        print('criptos cadastradas')
