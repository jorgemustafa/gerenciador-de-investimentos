from datetime import datetime

import yfinance as yf
from django.core.exceptions import ValidationError
from django.core.management.base import BaseCommand

from assets.models.assets import B3AcaoFii


class Command(BaseCommand):
    help = 'Clean objs in B3AcaoFiis, will keep only Stocks and Fiis'

    def handle(self, *args, **options):
        carteira_sa = [f'{acao.nome}.SA' for acao in B3AcaoFii.objects.all()]
        df = yf.download(tickers=carteira_sa, period='1d')
        for acao in B3AcaoFii.objects.all():
            try:
                acao.preco_fechamento = round(df['Adj Close'].iloc[0][f'{acao.nome}.SA'], 2)
                acao.save()
            except ValidationError:
                pass