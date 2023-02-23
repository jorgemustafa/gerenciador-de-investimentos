import investpy as inv
from django.core.management.base import BaseCommand

from assets.models.assets import B3AcaoFii


class Command(BaseCommand):
    help = 'Clean objs in B3AcaoFiis, will keep only Stocks and Fiis'

    def handle(self, *args, **options):
        for obj in B3AcaoFii.objects.all():
            if len(obj.nome) >= 7:
                obj.delete()


