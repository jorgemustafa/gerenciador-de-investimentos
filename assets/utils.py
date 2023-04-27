import decimal
import os
from datetime import datetime

import pandas as pd

from assets.models.extrato import Extrato
from engine.settings import DOWNLOAD_REPORT_FOLDER


def sell_assets(request, classe):
    unidades = float(request.data['unidades'])
    cotacao = float(request.data['cotacao'])
    carteira = int(request.data['carteira'])
    obj = classe.objects.filter(nome__id=int(request.data['nome']),
                                carteira__id=carteira).last()
    if unidades <= obj.unidades:
        obj.unidades -= decimal.Decimal(unidades)
        obj.save()
        # criar extrato
        Extrato.objects.create(
            objeto=obj,
            tipo_transacao='venda',
            unidades=unidades,
            cotacao=cotacao,
            saldo=unidades * cotacao,
            carteira_id=carteira
        )
        return True
    print('Valor da venda maior que total')


def sell_fixas(request, classe):
    carteira = int(request.data['carteira'])
    valor_venda = float(request.data['valor_investido'])
    obj = classe.objects.get(id=int(request.data['nome']),
                             carteira__id=carteira)
    if valor_venda <= obj.valor_investido:
        obj.valor_investido -= decimal.Decimal(valor_venda)
        obj.save()
        # criar extrato
        Extrato.objects.create(
            objeto=obj,
            tipo_transacao='venda',
            unidades=0,
            cotacao=0,
            saldo=valor_venda,
            carteira_id=carteira
        )
        return True
    print('Valor da venda maior que total')


def sell_prop(request, classe):
    carteira = int(request.data['carteira'])
    obj = classe.objects.get(id=int(request.data['nome']), carteira__id=carteira)
    # criar extrato
    Extrato.objects.create(
        objeto=obj,
        tipo_transacao='venda',
        unidades=0,
        cotacao=0,
        saldo=obj.valor_investido,
        carteira_id=carteira
    )
    obj.valor_investido = 0
    obj.save()
    return True


def gen_report(user):
    data = []
    extratos = Extrato.objects.filter(carteira__user=user).order_by('-id')
    for obj in extratos:
        data.append({
            'ID': obj.id,
            'Ativo': obj,
            'Cotação': obj.cotacao,
            'Unidades': obj.unidades,
            'Saldo': obj.saldo,
            'Inclusão': obj.inclusao.strftime("%d/%m/%Y - %H:%M:%S"),
            'Tipo': obj.tipo_transacao.capitalize()
        })
    df = pd.DataFrame(data)
    date_today = datetime.today().strftime("%d-%m-%Y")
    filename = f'Extrato-{date_today}.xlsx'
    full_path = DOWNLOAD_REPORT_FOLDER + filename

    if not df.empty:
        df.to_excel(
            excel_writer=full_path,
            sheet_name='Extrato',
            index=False
        )
        return 200
    return 500


def get_today_file(save_folder):
    today = datetime.today().strftime('%d-%m-%Y')
    for file in os.listdir(save_folder):
        if file.split('.')[-1] == 'xlsx' and today in file:
            return file


def delete_files(folder):
    for file in os.listdir(folder):
        os.remove(os.path.join(folder, file))
