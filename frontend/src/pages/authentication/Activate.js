import React, {useState} from "react";
import {Button, Col, Container} from '@themesberg/react-bootstrap';
import {connect} from 'react-redux';
import {verify} from "../../actions/auth";
import BgImage from "../../assets/img/illustrations/signin.svg";


const Activate = ({verify, match}) => {
    const [verified, setVerified] = useState(false);
    const [message, setMessage] = useState(<></>);

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
        setMessage(<p className="text-success text-center">Conta verificada! Redirecionando em 3,2,1...</p>)
    };

    if (verified) {
        setTimeout(() => {
            window.location.replace('/login')
        }, 3000)
    }

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5 justify-content-center "
                     style={{backgroundImage: `url(${BgImage})`}}>
                <Container>
                    <Col xs={12} className="d-flex align-items-center justify-content-center">
                        <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <div className="text-center text-md-center mb-4 mt-md-0">
                                <h3 className="mb-0">Bem vindo ao Voltage!</h3>
                                <br/>
                                <p>Clique no botão abaixo para verificar sua conta e fazer login</p>
                            </div>
                            <Button variant="primary" type="button" className="w-100 h-100"
                                    onClick={verify_account}>
                                Verificar
                            </Button>
                            <div>{message}</div>
                        </div>
                    </Col>
                </Container>
            </section>
        </main>


    );
};


export default connect(null, {verify})(Activate)
