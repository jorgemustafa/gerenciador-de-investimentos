import React, {useState} from "react";
import {Button, Col, Row} from '@themesberg/react-bootstrap';
import Table from "./Table";


export default () => {
    const [genMsg, setGenMsg] = useState(0)
    const [dlMsg, setDlMsg] = useState(0)
    let generateReport = async () => {
        try {
            let res = await fetch('http://localhost:8000/assets/exportar/',
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Content-Type': 'application/json'
                    },
                })
            if (res.status === 200) {
                setGenMsg(200);
                setDlMsg(0)
            } else {
                setGenMsg(500)
            }
        } catch (err) {
            setGenMsg(403)
        }
    }
    let downloadReport = async () => {
        try {
            let res = await fetch('http://localhost:8000/assets/baixar/',
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Content-Type': 'application/vnd.ms-excel'
                    },
                })
                .then((response) => response.blob())
                .then((blob) => {
                    // Create blob link to download
                    const url = window.URL.createObjectURL(
                        new Blob([blob])
                    );
                    const link = document.createElement('a');
                    link.href = url
                    link.setAttribute(
                        'download',
                        `relatorio-extrato-${new Date().toLocaleDateString('pt-br')}.xlsx`
                    );
                    // Append to html link element page
                    document.body.appendChild(link);
                    // Start download
                    link.click()
                    // Clean up and remove the link
                    link.parentNode.removeChild(link)
                });
            if (res.status === 200) {
                setDlMsg(200);
                setGenMsg(0)
            } else {
                setDlMsg(500)
            }
        } catch (err) {
            setDlMsg(403)
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>Extrato</h4>
                    <p className="mb-0">Consulte seu extrato para recordar ou editar seus investimentos.</p>
                </div>
            </div>

            <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                    {/*<Col xs={8} md={8} lg={8} xl={4}>*/}
                    {/*  <InputGroup>*/}
                    {/*    <InputGroup.Text>*/}
                    {/*      <FontAwesomeIcon icon={faSearch} />*/}
                    {/*    </InputGroup.Text>*/}
                    {/*    <Form.Control type="text" placeholder="Search" />*/}
                    {/*  </InputGroup>*/}
                    {/*</Col>*/}
                    <Col className="text-end">
                        <Button variant="outline-primary" size="sm" onClick={generateReport}>
                            Gerar Relatório
                        </Button>
                    </Col>
                </Row>
                <div className="genMsg pt-2 text-center">
                    {
                        genMsg === 200 ?
                            <>
                                <p className="text-success">Relatório gerado com sucesso! Clique para baixar</p>
                            </>
                            : null
                    }
                    {
                        dlMsg === 200 ?
                            <p className="text-success">Relatório baixado com sucesso!</p>
                            : null
                    }
                    {
                        genMsg === 200 || dlMsg === 200 ?
                            <Button variant="success" size="sm" onClick={downloadReport}>Baixar</Button>
                            : null
                    }
                </div>
            </div>
            <Table/>
        </>
    );
};
