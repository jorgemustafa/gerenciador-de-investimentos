import yfinance as yf
from django.core.exceptions import ValidationError
from django.core.management.base import BaseCommand

from assets.models.assets import ListAcaoFii


class Command(BaseCommand):
    help = 'Get close price for assets in B3'

    def handle(self, *args, **options):
        carteira_sa = [f'{acao.nome}.SA' for acao in ListAcaoFii.objects.all()]
        df = yf.download(tickers=carteira_sa, period='5d')
        for acao in ListAcaoFii.objects.all():
            try:
                acao.preco_fechamento = round(df['Adj Close'].iloc[0][f'{acao.nome}.SA'], 2)
                acao.save()
            except ValidationError:
                pass
