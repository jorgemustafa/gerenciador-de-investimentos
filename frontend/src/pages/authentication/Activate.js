import React, {useState} from "react";
import {Button, Col, Container} from '@themesberg/react-bootstrap';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {verify} from "../../actions/auth";
import BgImage from "../../assets/img/illustrations/signin.svg";


const Activate = ({verify, match}) => {
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        return <Redirect to='/login'/>
    }

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5 justify-content-center " style={{backgroundImage: `url(${BgImage})`}}>
                <Container>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-0">Bem vindo ao Voltage!</h3>
                                    <p>Clique no botão abaixo para verificar sua conta e fazer login</p>
                                </div>
                                <Button variant="primary" type="button" className="w-100 h-100"
                                        onClick={verify_account}>
                                    Verificar
                                </Button>
                            </div>
                        </Col>
                </Container>
            </section>
        </main>


    );
};


export default connect(null, {verify})(Activate)
