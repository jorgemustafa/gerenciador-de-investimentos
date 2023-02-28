import React, {Fragment, useEffect, useState} from "react";
import {Col, Row} from '@themesberg/react-bootstrap';

import {AlocacaoChart} from "./AlocacaoChart";
import {SalesValueWidget} from "./DesempenhoChart";
import * as PropTypes from "prop-types";

function Fragmento(props) {
    return null;
}

Fragmento.propTypes = {children: PropTypes.node};
const DashboardOverview = () => {

    const [desempenho, setDesempenho] = useState([])

    useEffect(() => {
        const loadData = () => {
            fetch('http://localhost:8000/assets/desempenho/', {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
                .then(response => response.json())
                .then(data => setDesempenho(data))
                .catch(err => {
                    console.log('DashboardOverview.js', err)
                })
        }
        loadData()
    }, [])

    const value = desempenho.value ? desempenho.value : 0
    const percent = desempenho.percent ? desempenho.percent : 0

    return (
        <Fragment>
            <Row className="justify-content-md-center">
                <Col xs={6} sm={6} xl={6} className="mb-4 d-none d-sm-block">
                    <SalesValueWidget
                        title="Desempenho"
                        value={value}
                        percentage={percent}
                    />
                </Col>
                <Col xs={6} sm={6} xl={6} className="mb-12">
                    <AlocacaoChart/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default DashboardOverview
