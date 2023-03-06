from datetime import datetime

import yfinance as yf
from django.core.exceptions import ValidationError
from django.core.management.base import BaseCommand

from assets.models.assets import ListAcaoAmericana


class Command(BaseCommand):
    help = 'Get close price for american stocks'

    def handle(self, *args, **options):
        carteira_sa = [acao.nome for acao in ListAcaoAmericana.objects.all()]
        df = yf.download(tickers=carteira_sa, period='1d')
        for acao in ListAcaoAmericana.objects.all():
            try:
                acao.preco_fechamento = round(df['Adj Close'].iloc[0][acao.nome], 2)
                acao.save()
            except ValidationError:
                pass