import React, {useEffect, useState} from 'react'
import {Button, Col, Form, InputGroup, Row} from "@themesberg/react-bootstrap";
import CurrencyInput from 'react-currency-input-field';
import "react-datepicker/dist/react-datepicker.css";

export default (asset) => {

    // if asset the request is Reinvestment, else NewInvestment
    let nomeHide = !!asset.asset;

    const [nome, setNome] = useState(asset.asset);
    const [dataOperacao, setDataOperacao] = useState(new Date());
    const [valorInvestido, setValorInvestido] = useState('');
    const [tipoAplicacao, setTipoAplicacao] = useState('');
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
                    console.log('PropriedadeForm.js', err)
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
            let res = await fetch('http://localhost:8000/assets/propriedade/',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: nome,
                        data_operacao: dataStrf(dataOperacao),
                        valor_investido: valorInvestido,
                        tipo_aplicacao: tipoAplicacao,
                        taxa: taxa,
                        carteira: carteira[0].id
                    })
                })
            if (res.status === 200) {
                setMessage(<p className="text-success text-center">Ativo cadastrado com sucesso!</p>);
                // clean fields
                setNome('')
                setDataOperacao(new Date())
                setValorInvestido('')
                setTipoAplicacao('')
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
                    <Form.Group id="nome" className="mb-4">
                        <InputGroup>
                            <Form.Control
                                autoFocus
                                required
                                type="text"
                                placeholder="Nome do Título"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                hidden={nomeHide}
                            />
                        </InputGroup>
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