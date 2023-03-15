from django.db.models import Sum

from assets.models.assets import AcaoFii


def vender_acoes_fiis(request):
    id_obj = int(request.data['nome'])
    carteira = int(request.data['carteira'])
    unidades = int(request.data['unidades'])
    objs = AcaoFii.objects.filter(nome__id=id_obj, carteira__id=carteira).order_by('-unidades')
    objs_sum = objs.aggregate(Sum('unidades'))['unidades__sum']
    objs_habilitados_venda = []
    if objs_sum > unidades:
        for obj in objs:
            if obj.unidades > unidades and not objs_habilitados_venda:
                objs_habilitados_venda.append(obj)
                obj.unidades = obj.unidades - unidades
                obj.save()
                # criar extrato
                print('Venda registrada com sucesso')
        if not objs_habilitados_venda:
            print('Venda não é maior que o total, mas é maior que ativo')
    else:
        print('Venda é maior que total de ações')
