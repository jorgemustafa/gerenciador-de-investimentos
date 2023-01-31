import React, {useEffect, useState} from 'react'
import {Button, Col, Form, FormLabel, InputGroup, Row} from "@themesberg/react-bootstrap";
import CurrencyInput from 'react-currency-input-field';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default (asset) => {

    // if asset has length bigger than 0, the request is Reinvestment, else NewInvestment
    let nomeHide = asset.asset.length > 0;

    const [nome, setNome] = useState(asset.asset);
    const [cotacao, setCotacao] = useState('');
    const [dataOperacao, setDataOperacao] = useState(new Date());
    const [unidades, setUnidades] = useState('');
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
                    console.log('AcaoAmForm.js', err)
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
            let res = await fetch('http://localhost:8000/assets/acaoam/',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: nome,
                        cotacao: cotacao,
                        data_operacao: dataStrf(dataOperacao),
                        unidades: unidades,
                        taxa: taxa,
                        carteira: carteira[0].id
                    })
                })
            if (res.status === 200) {
                setMessage(<p className="text-success text-center">Ativo <b>{nome}</b> cadastrado com sucesso!</p>);
                // clean fields
                setNome('')
                setDataOperacao(new Date())
                setCotacao('')
                setUnidades('')
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
                                placeholder="Ticker do ativo"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                hidden={nomeHide}
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
                    <Form.Group id="cotacao" className="mb-4">
                        <InputGroup>
                            <CurrencyInput
                                className="form-control"
                                required
                                name="cotacao"
                                defaultValue={cotacao}
                                placeholder="Cotação (em dolár)"
                                decimalsLimit={2}
                                prefix="$"
                                onChange={(e) => setCotacao(e.target.value.replace('$', '').replaceAll(',', ''))}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group id="unidades" className="mb-4">
                        <InputGroup>
                            <Form.Control
                                autoFocus
                                required
                                type="number"
                                placeholder="Unidades"
                                name="unidades"
                                value={unidades}
                                onChange={(e) => setUnidades(e.target.value)}
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
                                prefix="$"
                                onChange={(e) => setTaxa(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <div className="message pt-1 pb-2 text-center">Seu investimento está sendo de</div>
                    <div className="text-center h3 pb-3">$ {(unidades * cotacao).toFixed(2)}</div>
                    <Button variant="primary" type="submit" className="w-100">
                        Concluir
                    </Button>
                    <div className="message pt-2">{message ? <>{message}</> : null}</div>
                </Form>
            </Col>
        </Row>
    )
}