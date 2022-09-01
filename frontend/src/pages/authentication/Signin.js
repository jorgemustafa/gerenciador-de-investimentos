import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faUnlockAlt} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF, faGithub, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {Col, Row, Form, Card, Button, FormCheck, Container, InputGroup} from '@themesberg/react-bootstrap';
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
            const res = await axios.get(`/auth/o/google-oauth2/?redirect_uri=/google`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`/auth/o/facebook/?redirect_uri=/facebook`)

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
                                    <h3 className="mb-0">Sign in to our platform</h3>
                                </div>
                                <Form className="mt-4" onSubmit={e => onSubmit(e)}>
                                    <Form.Group id="email" className="mb-4">
                                        <Form.Label>Your Email</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                autoFocus
                                                required
                                                type="email"
                                                placeholder="example@company.com"
                                                name='email'
                                                value={email}
                                                onChange={e => onChange(e)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Group id="password" className="mb-4">
                                            <Form.Label>Your Password</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faUnlockAlt}/>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    placeholder="Password"
                                                    name='password'
                                                    value={password}
                                                    onChange={e => onChange(e)}
                                                    minLength='6'
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <Form.Check type="checkbox">
                                                <FormCheck.Input id="defaultCheck5" className="me-2"/>
                                                <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember
                                                    me</FormCheck.Label>
                                            </Form.Check>
                                            <Card.Link as={Link} to={Routes.ResetPassword.path}
                                                       className="small text-end">Lost password?</Card.Link>
                                        </div>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Sign in
                                    </Button>
                                </Form>

                                <div className="mt-3 mb-4 text-center">
                                    <span className="fw-normal">or login with</span>
                                </div>
                                <div className="d-flex justify-content-center my-4">
                                    <Button variant="outline-light"
                                            className="btn-icon-only btn-pill text-facebook me-2">
                                        <FontAwesomeIcon icon={faFacebookF}/>
                                    </Button>
                                    <Button variant="outline-light"
                                            className="btn-icon-only btn-pill text-twitter me-2">
                                        <FontAwesomeIcon icon={faTwitter}/>
                                    </Button>
                                    <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                                        <FontAwesomeIcon icon={faGithub}/>
                                    </Button>
                                </div>
                                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
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
