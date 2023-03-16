import React from "react";
import {Col, Row, Button, Container} from '@themesberg/react-bootstrap';

import BgImage from "../../../assets/img/illustrations/signin.svg"
import {Link} from "react-router-dom";
import {Routes} from "../../../routes";

export default () => {
    return (
        <main>
            <section className="h-100 bg-soft d-flex align-items-center my-4">
                <Container>
                    <Row className="justify-content-center" style={{backgroundImage: `url(${BgImage})`}}>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border border-light rounded p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-3">Nova transação</h3>
                                </div>
                                <Button as={Link} to={Routes.NewInvestment.path} variant="primary"
                                        className="w-100 mb-2">Novo Investimento</Button>
                                <Button as={Link} to={Routes.ReInvestment.path} variant="primary" className="w-100 mb-2">Reinvestimento</Button>
                                <Button as={Link} to={Routes.Sale.path} variant="primary" className="w-100 mb-2">Nova Venda</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};
