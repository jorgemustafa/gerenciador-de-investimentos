import investpy as inv

from assets.models.assets import B3AcaoFii

df = inv.stocks.get_stocks('brazil')
df = df.reset_index()

for index, row in df.iterrows():
    B3AcaoFii.objects.create(ticker=row['symbol'], nome=row['name'])
print('ativos cadastrados')
