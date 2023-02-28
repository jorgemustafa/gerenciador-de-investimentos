def get_desempenho_geral(ativos):
    carteira_acoes = []
    for ativo in ativos:
        if ativo.__class__.__name__ == 'AcaoFii':
            carteira_acoes.append(ativo)
    get_desempenho_acoes(carteira_acoes)

def get_desempenho_acoes(carteira_acoes):
    valorizacao_acoes = 0
    for acao in carteira_acoes:
       valorizacao_acoes += (acao.nome.preco_fechamento - acao.cotacao) * acao.unidades
    print(valorizacao_acoes)