import {Card, Col, Row} from "@themesberg/react-bootstrap";
import {CircleChart} from "../../../components/Charts";
import React, {useEffect, useState} from "react";

export const AlocacaoChart = () => {

    const [carteira, setCarteira] = useState([])

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
                    console.log('AlocacaoChart.js', err)
                })
        }
        loadData()
    }, [])
    const assets = carteira.map(c => c.assets)

    return (
        <Card border="light" className="shadow-sm">
            <Card.Body>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col xs={12} xl={5}
                         className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0">
                        <CircleChart series={assets[0]}/>
                    </Col>
                    <Col xs={12} xl={7} className="px-xl-0">
                        <h5 className="mb-3">Alocação</h5>
                        {carteira.map(c =>
                            <>
                                {c.assets.map(a =>
                                    <h6 key={`circle-element-${a.id}`}
                                        className={`fw-normal text-${a.color}`}>
                                        {a.value}% {a.label} <br/>
                                    </h6>
                                )}
                            </>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};