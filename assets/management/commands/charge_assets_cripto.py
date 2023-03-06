import investpy as inv
from django.core.management.base import BaseCommand

from assets.models.assets import ListCriptomoeda


class Command(BaseCommand):
    help = 'Create objs in database getting by binance API'

    def handle(self, *args, **options):
        ListCriptomoeda.objects.all().delete()
        df = inv.stocks.get_stocks('united states')
        df = df.reset_index()

        for index, row in df.iterrows():
            if 3 <= len(row['symbol']) <= 5:
                ListCriptomoeda.objects.create(nome=row['symbol'], empresa=row['name'])
        print('ativos cadastrados')
