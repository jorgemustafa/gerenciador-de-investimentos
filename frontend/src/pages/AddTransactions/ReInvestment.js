import React, {useEffect, useState} from "react";
import {Col, Container, Form, FormSelect, InputGroup, Row} from "@themesberg/react-bootstrap";
import AcaoFiiEditForm from "./Forms/Reinvestment/AcaoFiiEditForm";
import AcaoAmEditForm from "./Forms/Reinvestment/AcaoAmEditForm";
import RendaFixaEditForm from "./Forms/Reinvestment/RendaFixaEditForm";
import TesouroDiretoEditForm from "./Forms/Reinvestment/TesouroDiretoEditForm";
import CriptomoedaEditForm from "./Forms/Reinvestment/CriptomoedaEditForm";
import PropriedadeEditForm from "./Forms/Reinvestment/PropriedadeEditForm";

export default () => {

    const [responseAtivos, setResponseAtivos] = useState([])
    const [selectedAsset, setSelectedAsset] = useState('')

    // get assets by user
    useEffect(() => {
        const loadData = () => {
        }
        fetch('http://localhost:8000/assets/list/', {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
            .then(response => response.json())
            .then(data => setResponseAtivos(data))
            .catch(err => {
                console.log('Reinvestment.js', err)
            })
        loadData()
    }, [])

    return (
        <main>
            <section className="bg-soft d-flex align-items-center my-4">
                <Container className="h-auto justify-content-center">
                    <Row className="justify-content-center">
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <Form className="mt-4">
                                <div
                                    className="bg-white shadow-soft border border-light rounded p-4 p-lg-5 w-100 fmxw-500 text-md-center">
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
                                                {responseAtivos.map(ativo =>
                                                    <option className="fw-bold" key={ativo.name} value={ativo.name}>
                                                        {ativo.name}
                                                    </option>
                                                )}
                                            </FormSelect>
                                            <AcaoFiiEditForm asset={selectedAsset}/>
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}