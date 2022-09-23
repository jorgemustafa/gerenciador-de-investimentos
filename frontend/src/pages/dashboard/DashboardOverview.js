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

    const [asset, setAsset] = useState([])

    useEffect(() => {
        const loadData = () => {
            fetch('http://localhost:8000/assets/list/', {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
                .then(response => response.json())
                .then(data => setAsset(data))
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
                    {asset.map(asset =>
                        <>
                            <p>{asset.nome}</p>
                        </>
                    )}
                </Col>
            </Row>
        </Fragment>
    );
};

export default DashboardOverview
