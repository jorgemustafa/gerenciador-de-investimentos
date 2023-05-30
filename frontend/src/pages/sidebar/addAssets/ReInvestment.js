import React, {useEffect, useState} from "react";
import {Col, Container, Form, FormSelect, InputGroup, Row} from "@themesberg/react-bootstrap";
import AcaoFiiForm from "./forms/AcaoFiiForm";
import AcaoAmForm from "./forms/AcaoAmForm";
import RendaFixaForm from "./forms/RendaFixaForm";
import TesouroDiretoForm from "./forms/TesouroDiretoForm";
import CriptomoedaForm from "./forms/CriptomoedaForm";
import PropriedadeForm from "./forms/PropriedadeForm";

export default () => {
    // parsing response assets
    const [responseAtivos, setResponseAtivos] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState('');
    const assetType = selectedAsset.split(';')[0];
    const assetName = selectedAsset.split(';')[1];
    const assetId = selectedAsset.split(';')[2];

    // variables of statement for turn on or off forms
    const [acoesFiiVisible, setAcoesFiiVisible] = useState(false);
    const [acoesAmVisible, setAcoesAmVisible] = useState(false);
    const [rendaFixaVisible, setRendaFixaVisible] = useState(false);
    const [tesouroVisible, setTesouroVisible] = useState(false);
    const [criptoVisible, setCriptoVisible] = useState(false);
    const [propVisible, setPropVisible] = useState(false);

    // turn on or off forms
    useEffect(() => {
        assetType === 'AcaoFii' ? setAcoesFiiVisible(true) : setAcoesFiiVisible(false);
        assetType === 'AcaoAmericana' ? setAcoesAmVisible(true) : setAcoesAmVisible(false);
        assetType === 'RendaFixa' ? setRendaFixaVisible(true) : setRendaFixaVisible(false);
        assetType === 'TesouroDireto' ? setTesouroVisible(true) : setTesouroVisible(false);
        assetType === 'Criptomoeda' ? setCriptoVisible(true) : setCriptoVisible(false);
        assetType === 'Propriedade' ? setPropVisible(true) : setPropVisible(false);
    }, [assetType]);

    // get assets by user
    useEffect(() => {
        const loadData = () => {
            fetch(`${process.env.REACT_APP_API_URL}/assets/list/`, {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
                .then(response => response.json())
                .then(data => setResponseAtivos(data))
                .catch(err => {
                    console.log('Reinvestment.js', err)
                })
        }
        loadData()
    }, [])

    return (
        <main>
            <section className="bg-soft d-flex align-items-center my-4">
                <Container className="h-auto justify-content-center">
                    <Row className="justify-content-center">
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border border-light
                                rounded p-4 p-lg-5 w-100 fmxw-500 text-md-center">
                                <Form className="mt-4">
                                    <div className="text-center text-md-center mb-4 mt-md-0">
                                        <h3 className="mb-3">Reinvestimento</h3>
                                    </div>
                                    <span className="tooltiptext">Escolha o ativo:</span>
                                    <Form.Group id="tipo_aplicacao" className="mb-4">
                                        <InputGroup>
                                            <FormSelect
                                                autoFocus
                                                required
                                                name="tipo_aplicacao"
                                                placeholder="Tipo de Aplicação"
                                                value={selectedAsset}
                                                onChange={(e) => setSelectedAsset(e.target.value)}
                                            >
                                                <option className="fw-bold" key="" value="0">
                                                    --------------
                                                </option>
                                                {responseAtivos.map((ativo) => (
                                                        ativo.type !== 'RendaFixa' || ativo.type !== 'TesouroDireto' || ativo.type !== 'Propriedade' ?
                                                            (<option className="fw-bold"
                                                                     value={ativo.type + ';' + ativo.name + ';' + ativo.id}>
                                                                {ativo.name}
                                                            </option>)
                                                            :
                                                            <></>
                                                    )
                                                )}
                                            </FormSelect>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                                {
                                    acoesFiiVisible ? <AcaoFiiForm asset={assetId}/> :
                                        acoesAmVisible ? <AcaoAmForm asset={assetId}/> :
                                            rendaFixaVisible ? <RendaFixaForm asset={assetId}/> :
                                                tesouroVisible ? <TesouroDiretoForm asset={assetId}/> :
                                                    criptoVisible ? <CriptomoedaForm asset={assetId}/> :
                                                        propVisible ? <PropriedadeForm asset={assetName}/> :
                                                            null
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}