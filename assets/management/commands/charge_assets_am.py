import investpy as inv
from django.core.management.base import BaseCommand

from assets.models.assets import ListAcaoAmericana


class Command(BaseCommand):
    help = 'Create objs in database getting by USA stock exchanges api'

    def handle(self, *args, **options):
        ListAcaoAmericana.objects.all().delete()
        df = inv.stocks.get_stocks('united states')
        df = df.reset_index()

        for index, row in df.iterrows():
            if 3 <= len(row['symbol']) <= 5:
                ListAcaoAmericana.objects.create(nome=row['symbol'], empresa=row['name'])
        print('ativos cadastrados')
