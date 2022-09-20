import React, {Fragment, useEffect, useState} from "react";
import {Col, Row} from '@themesberg/react-bootstrap';

import {trafficShares} from "../../data/charts";
import {CircleChartWidget} from "./AlocacaoChart";
import {SalesValueWidget} from "./DesempenhoChart";
import * as PropTypes from "prop-types";

function Fragmento(props) {
    return null;
}

Fragmento.propTypes = {children: PropTypes.node};
const DashboardOverview = () => {

    const [acao, setAcao] = useState([])

    useEffect(() => {
        const loadData = () => {
            fetch('http://localhost:8000/assets/abef/', {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
                .then(response => response.json())
                .then(data => setAcao(data))
                .catch(err => {
                    console.log('DashboardOverview.js', err)
                })
        }
        loadData()
    }, [])

    return (
        <Fragment>
            <Row className="justify-content-md-center">
                <Col xs={6} sm={6} xl={6} className="mb-4 d-none d-sm-block">
                    <SalesValueWidget
                        title="Desempenho"
                        value="10,567"
                        percentage={10.57}
                    />
                </Col>
                <Col xs={6} sm={6} xl={6} className="mb-12">
                    <CircleChartWidget
                        title="Alocação"
                        data={trafficShares}/>
                </Col>
                <Col>
                    {acao.map(a =>
                        <>
                            <p>{a.nome} | {a.cotacao} | {a.unidades} | {a.taxa}</p>
                        </>
                    )}
                </Col>
            </Row>
        </Fragment>
    );
};

export default DashboardOverview
