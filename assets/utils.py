from assets.models.extrato import Extrato


def sell_assets(request, classe):
    unidades = int(request.data['unidades'])
    cotacao = int(request.data['cotacao'])
    obj = classe.objects.filter(nome__id=int(request.data['nome']),
                                carteira__id=int(request.data['carteira'])).last()
    if unidades <= obj.unidades:
        obj.unidades -= unidades
        obj.save()
        # criar extrato
        Extrato.objects.create(
            objeto=obj,
            tipo_transacao='venda',
            unidades=unidades,
            cotacao=cotacao,
            saldo=unidades * cotacao,
        )
        return True
    return print('Venda é maior que total de ações')
