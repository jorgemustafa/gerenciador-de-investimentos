import React, {useEffect, useState} from "react";
import {Col, Container, Row, FormSelect} from "@themesberg/react-bootstrap";
import AcaoFiiForm from "./Forms/AcaoFiiForm";
import AcaoAmForm from "./Forms/AcaoAmForm";
import RendaFixaForm from "./Forms/RendaFixaForm";
import TesouroDiretoForm from "./Forms/TesouroDiretoForm";
import CriptomoedaForm from "./Forms/CriptomoedaForm";
import PropriedadeForm from "./Forms/PropriedadeForm"

export default () => {

    const categorias = [
        {name: 'Ações ou FIIs', value: 'AF'},
        {name: 'Ações Americanas', value: 'AM'},
        {name: 'Renda Fixa', value: 'RF'},
        {name: 'Tesouro Direto', value: 'TD'},
        {name: 'Criptomoedas', value: 'CM'},
        {name: 'Propriedades', value: 'PP'}
    ]

    const [categoria, setCategoria] = useState('AF')

    const [acoesFiiVisible, setAcoesFiiVisible] = useState(false);
    const [acoesAmVisible, setAcoesAmVisible] = useState(false);
    const [rendaFixaVisible, setRendaFixaVisible] = useState(false);
    const [tesouroVisible, setTesouroVisible] = useState(false);
    const [criptoVisible, setCriptoVisible] = useState(false);
    const [propVisible, setPropVisible] = useState(false);

    useEffect(() => {
        categoria === 'AF' ? setAcoesFiiVisible(true) : setAcoesFiiVisible(false)
        categoria === 'AM' ? setAcoesAmVisible(true) : setAcoesAmVisible(false)
        categoria === 'RF' ? setRendaFixaVisible(true) : setRendaFixaVisible(false)
        categoria === 'TD' ? setTesouroVisible(true) : setTesouroVisible(false)
        categoria === 'CM' ? setCriptoVisible(true) : setCriptoVisible(false)
        categoria === 'PP' ? setPropVisible(true) : setPropVisible(false)
    }, [categoria])

    const handleOnChange = (e) => {
        setCategoria(e.target.value);
    };

    return (
        <main>
            <section className="bg-soft d-flex align-items-center my-4">
                <Container className="h-auto">
                    <Row className="justify-content-center">
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border border-light rounded p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-3">Novo Investimento</h3>
                                </div>
                                <span className="tooltiptext">Escolha a categoria:</span>
                                <FormSelect onChange={handleOnChange}>
                                    {categorias.map(categoria =>
                                        <option className="fw-bold" key={categoria.value} value={categoria.value}>
                                            {categoria.name}
                                        </option>
                                    )}
                                </FormSelect>
                                {acoesFiiVisible ? <AcaoFiiForm/> : <></>}
                                {acoesAmVisible ? <AcaoAmForm/> : null}
                                {rendaFixaVisible ? <RendaFixaForm/> : null}
                                {tesouroVisible ? <TesouroDiretoForm/> : null}
                                {criptoVisible ? <CriptomoedaForm/> : null}
                                {propVisible ?  <PropriedadeForm/> : null}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}