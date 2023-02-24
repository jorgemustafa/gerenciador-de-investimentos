import React, {useEffect, useState} from 'react'
import {Button, Col, Form, FormLabel, FormSelect, InputGroup, Row} from "@themesberg/react-bootstrap";
import CurrencyInput from 'react-currency-input-field';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default (asset) => {

    // if asset the request is Reinvestment, else NewInvestment
    let nomeHide = !!asset.asset;

    const produtos = [
        {name: 'Selecione um Produto', value: ''},
        {name: 'CDB', value: 'cdb'},
        {name: 'RDB', value: 'rdb'},
        {name: 'LC', value: 'lc'},
        {name: 'LCI', value: 'lci'},
        {name: 'LCA', value: 'lca'},
        {name: 'LIG', value: 'lig'},
        {name: 'CPR', value: 'cpr'},
        {name: 'CRI', value: 'cri'},
        {name: 'CRA', value: 'cra'}
    ]

    const tipoAplicacoes = [
        {name: 'Selecione a Aplicação', value: ''},
        {name: 'PRÉ', value: 'pre'},
        {name: 'CDI', value: 'cdi'},
        {name: 'CDI+', value: 'cdi+'},
        {name: 'IPCA+', value: 'ipca+'},
        {name: 'SELIC', value: 'selic'},
        {name: 'SELIC+', value: 'selic+'},
        {name: 'IGPM+', value: 'igpm+'},
        {name: 'IGPDI+', value: 'igpdi+'}
    ]

    const [nome, setNome] = useState(asset.asset);
    const [emissor, setEmissor] = useState('');
    const [dataOperacao, setDataOperacao] = useState(new Date());
    const [valorInvestido, setValorInvestido] = useState('');
    const [tipoAplicacao, setTipoAplicacao] = useState('');
    const [rentabilidade, setRentabilidade] = useState('')
    const [vencimento, setVencimento] = useState();
    const [liquidez, setLiquidez] = useState('');
    const [taxa, setTaxa] = useState('');
    const [carteira, setCarteira] = useState('')
    const [message, setMessage] = useState('');

    // get carteira id
    useEffect(() => {
        const loadData = () => {
            fetch('http://localhost:8000/assets/carteira/', {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
                .then(response => response.json())
                .then(data => setCarteira(data))
                .catch(err => {
                    console.log('RendaFixaForm.js', err)
                })
        }
        loadData()
    }, [])

    let dataStrf = (date) => {
        return date.toLocaleDateString('pt-br')
    }

    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await fetch('http://localhost:8000/assets/fixa/',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: nome,
                        emissor: emissor,
                        data_operacao: dataStrf(dataOperacao),
                        valor_investido: valorInvestido,
                        tipo_aplicacao: tipoAplicacao,
                        vencimento: dataStrf(vencimento),
                        rentabilidade: rentabilidade,
                        liquidez: liquidez,
                        taxa: taxa,
                        carteira: carteira[0].id
                    })
                })
            if (res.status === 200) {
                setMessage(<p className="text-success text-center">Ativo <b>{nome}</b> cadastrado com sucesso!</p>);
                // clean fields
                setNome('')
                setEmissor('')
                setDataOperacao(new Date())
                setValorInvestido('')
                setTipoAplicacao('')
                setRentabilidade('')
                setVencimento()
                setLiquidez('')
                setTaxa('')
            } else {
                setMessage(<p className="text-danger text-center">Um erro ocorreu: ${res.statusText}</p>)
            }
        } catch (err) {
            setMessage(<p className="text-danger text-center">Um erro ocorreu: ${err.message}</p>)
        }
    }

    return (
        <Row>
            <Col xs={12} className="ps-5 pe-5 align-items-center">
                <Form className="mt-4" onSubmit={handleSubmit}>
                    {nomeHide ?
                        <Form.Group id="nome">
                            <InputGroup>
                                <Form.Control
                                    autoFocus
                                    required
                                    type="text"
                                    name="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    hidden={true}
                                />
                            </InputGroup>
                        </Form.Group>
                        :
                        <Form.Group id="nome" className="mb-4">
                            <InputGroup>
                                <FormSelect
                                    autoFocus
                                    required
                                    name="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                >
                                    {produtos.map(produto =>
                                        <option className="fw-bold" key={produto.value} value={produto.value}>
                                            {produto.name}
                                        </option>
                                    )}
                                </FormSelect>
                            </InputGroup>
                        </Form.Group>
                    }
                    <Form.Group id="emissor" className="mb-4">
                        <InputGroup>
                            <Form.Control
                                autoFocus
                                required
                                type="text"
                                placeholder="Banco Emissor"
                                name="emissor"
                                value={emissor}
                                onChange={(e) => setEmissor(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group id="data_operacao" className="mb-4">
                        <FormLabel className="data_operacao"> Data da Operação
                            <InputGroup>
                                <DatePicker
                                    className="form-control"
                                    dateFormat="dd/MM/yyyy"
                                    selected={dataOperacao}
                                    onChange={(data) => setDataOperacao(data)}
                                />
                            </InputGroup>
                        </FormLabel>
                    </Form.Group>
                    <Form.Group id="valor_investido" className="mb-4">
                        <InputGroup>
                            <CurrencyInput
                                className="form-control"
                                required
                                name="valorInvestido"
                                defaultValue={valorInvestido}
                                placeholder="Valor Investido"
                                decimalsLimit={2}
                                prefix="R$"
                                value={valorInvestido}
                                onChange={(e) => setValorInvestido(e.target.value.replace('R$', '').replaceAll(',', ''))}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group id="tipo_aplicacao" className="mb-4">
                        <InputGroup>
                            <FormSelect
                                autoFocus
                                required
                                name="tipo_aplicacao"
                                placeholder="Tipo de Aplicação"
                                value={tipoAplicacao}
                                onChange={(e) => setTipoAplicacao(e.target.value)}
                            >
                                {tipoAplicacoes.map(tipo =>
                                    <option className="fw-bold" key={tipo.value} value={tipo.value}>
                                        {tipo.name}
                                    </option>
                                )}
                            </FormSelect>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group id="rentabilidade" className="mb-4">
                        <InputGroup>
                            <CurrencyInput
                                className="form-control"
                                required
                                name="rentabilidade"
                                defaultValue={rentabilidade}
                                placeholder="Rentabilidade"
                                decimalsLimit={3}
                                suffix="%"
                                maxLength={5}
                                value={rentabilidade}
                                onChange={(e) => setRentabilidade(e.target.value.replace('%', ''))}
                            />
                        </InputGroup>
                    </Form.Group>
                    <FormLabel className="vencimento"> Vencimento
                        <Form.Group id="vencimento" className="mb-4">
                            <InputGroup>
                                <DatePicker
                                    className="form-control"
                                    placeholder="Vencimento"
                                    dateFormat="dd/MM/yyyy"
                                    selected={vencimento}
                                    onChange={(data) => setVencimento(data)}
                                />
                            </InputGroup>
                        </Form.Group>
                    </FormLabel>
                    <Form.Group id="liquidez" className="mb-4">
                        <InputGroup>
                            <CurrencyInput
                                className="form-control"
                                required
                                autoFocus
                                placeholder="Liquidez"
                                name="liquidez"
                                decimalsLimit={0}
                                prefix="D+"
                                maxLength={3}
                                defaultValue={liquidez}
                                value={liquidez}
                                onChange={(e) => setLiquidez(e.target.value.replace('D+', ''))}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group id="taxa" className="mb-4">
                        <InputGroup>
                            <Form.Control
                                autoFocus
                                type="text"
                                placeholder="Taxas (opcional)"
                                name="taxa"
                                value={taxa}
                                onChange={(e) => setTaxa(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <div className="message pt-1 pb-2 text-center">Seu investimento está sendo de</div>
                    <div className="text-center h3 pb-3">R$ {(1 * valorInvestido).toFixed(2)}</div>
                    <Button variant="primary" type="submit" className="w-100">
                        Concluir
                    </Button>
                    <div className="message pt-2">{message ? <>{message}</> : null}</div>
                </Form>
            </Col>
        </Row>
    )
}