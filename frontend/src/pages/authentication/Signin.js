import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faUnlockAlt} from "@fortawesome/free-solid-svg-icons";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {Button, Card, Col, Container, Form, InputGroup, Row} from '@themesberg/react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {Routes} from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import {login} from "../../actions/auth";


const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        login(email, password)
    }

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    if (isAuthenticated) {
        return <Redirect to={Routes.DashboardOverview.path}/>
    }

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center form-bg-image" style={{backgroundImage: `url(${BgImage})`}}>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-0">Entrar no Voltage</h3>
                                </div>
                                <Form className="mt-4" onSubmit={e => onSubmit(e)}>
                                    <Form.Group id="email" className="mb-4">
                                        <Form.Label>Email</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                autoFocus
                                                required
                                                type="email"
                                                placeholder="exemplo@dominio.com"
                                                name='email'
                                                value={email}
                                                onChange={e => onChange(e)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Group id="password" className="mb-4">
                                            <Form.Label>Senha</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faUnlockAlt}/>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    placeholder="Password@123"
                                                    name='password'
                                                    id='input_password'
                                                    value={password}
                                                    onChange={e => onChange(e)}
                                                    minLength='6'
                                                />
                                            </InputGroup>
                                            <div className="text-danger text-center" id="error-pass"></div>
                                        </Form.Group>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <Card.Link as={Link} to={Routes.ResetPassword.path}
                                                       className="small text-end">Esqueceu a senha?</Card.Link>
                                        </div>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Entrar
                                    </Button>
                                </Form>

                                <div className="mt-3 mb-4 text-center">
                                    <span className="fw-normal">ou entre com</span>
                                </div>
                                <div className="d-flex justify-content-center my-4">
                                    <Button variant="outline-light"
                                            className="btn-icon-only btn-pill text-twitter me-2"
                                            onClick={continueWithGoogle}>
                                        <FontAwesomeIcon icon={faGoogle}/>
                                    </Button>
                                </div>
                                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Não é registrado?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Criar conta `}
                    </Card.Link>
                  </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login)
