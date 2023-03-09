from binance import Client
from django.core.management.base import BaseCommand

from assets.models.assets import ListCriptomoeda


class Command(BaseCommand):
    help = 'Create objs in database getting by binance API'

    def handle(self, *args, **options):
        client= Client(api_key='', api_secret='')
        # get all tickers and prices
        assets = client.get_all_tickers()
