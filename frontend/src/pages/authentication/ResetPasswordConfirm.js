import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faUnlockAlt} from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Col, Container, Form, InputGroup, Row} from '@themesberg/react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {Routes} from "../../routes";
import {reset_password_confirm} from "../../actions/auth";


const ResetPasswordConfirm = ({match, reset_password_confirm}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });
    const [message, setMessage] = useState(<></>);
    const {new_password, re_new_password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid
        const token = match.params.token

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
        setMessage(<p className="text-success text-center">Senha alterada com sucesso!<br/>Redirecionando em 3,2,1...</p>)
    };

    if (requestSent) {
        setTimeout(() => {
            window.location.replace('/login')
        }, 3000)
    }

    return (
        <main>
            <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center">
                        <p className="text-center">
                            <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                                <FontAwesomeIcon icon={faAngleLeft} className="me-2"/> Voltar para Login
                            </Card.Link>
                        </p>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-0">Redefinir senha</h3>
                                </div>
                                <Form onSubmit={e => onSubmit(e)}>
                                    <Form.Group id="password_confirm" className="mb-4">
                                        <Form.Label>Nova Senha</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="password"
                                                placeholder="NovaSenha@123"
                                                name='new_password'
                                                value={new_password}
                                                onChange={e => onChange(e)}
                                                minLength='6'
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="re_password_confirm" className="mb-4">
                                        <Form.Label>Confirme a senha</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="password"
                                                placeholder="NovaSenha@123"
                                                name='re_new_password'
                                                value={re_new_password}
                                                onChange={e => onChange(e)}
                                                minLength='6'
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Redefinir
                                    </Button>
                                </Form>
                                <div className="d-flex justify-content-center align-items-center mt-4">
                                    {message}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};

export default connect(null, {reset_password_confirm})(ResetPasswordConfirm)