import investpy as inv
from django.core.management.base import BaseCommand

from assets.models.assets import ListAcaoFii


class Command(BaseCommand):
    help = 'Create objs in database getting by b3 api'

    def handle(self, *args, **options):
        ListAcaoFii.objects.all().delete()
        df = inv.stocks.get_stocks('brazil')
        df = df.reset_index()

        for index, row in df.iterrows():
            if len(row['symbol']) <= 7:
                ListAcaoFii.objects.create(nome=row['symbol'], empresa=row['name'])
        print('ativos cadastrados')
