import React, {Fragment} from "react";
import {Col, Row} from '@themesberg/react-bootstrap';

import {AlocacaoChart} from "./AlocacaoChart";
import {SalesValueWidget} from "./DesempenhoChart";
import * as PropTypes from "prop-types";

function Fragmento(props) {
    return null;
}

Fragmento.propTypes = {children: PropTypes.node};
const DashboardOverview = () => {

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
                    <AlocacaoChart/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default DashboardOverview
