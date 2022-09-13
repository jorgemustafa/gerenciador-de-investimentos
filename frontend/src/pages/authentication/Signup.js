import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faUnlockAlt, faPen, faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {Col, Row, Form, Card, Button, Container, InputGroup} from '@themesberg/react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {Routes} from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import {signup} from "../../actions/auth";


const Signup = ({signup, isAuthenticated}) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const {first_name, last_name, email, password, re_password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password);
            setAccountCreated(true);
        }
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    if (isAuthenticated) {
        return <Redirect to='/'/>
    }
    if (accountCreated) {
        return <Redirect to='/login'/>
    }

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center form-bg-image" style={{backgroundImage: `url(${BgImage})`}}>
                        <p className="text-center">
                            <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                                <FontAwesomeIcon icon={faAngleLeft} className="me-2"/> Back to sign in
                            </Card.Link>
                        </p>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-0">Sign up to Voltage</h3>
                                </div>
                                <Form className="mt-4" onSubmit={e => onSubmit(e)}>
                                    <Form.Group id="first_name" className="mb-4">
                                        <Form.Label>First Name</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faPen}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                autoFocus
                                                required
                                                type="text"
                                                placeholder="Fulano"
                                                name='first_name'
                                                value={first_name}
                                                onChange={e => onChange(e)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="last_name" className="mb-4">
                                        <Form.Label>Last Name</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faPen}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                autoFocus
                                                required
                                                type="text"
                                                placeholder="Silva"
                                                name='last_name'
                                                value={last_name}
                                                onChange={e => onChange(e)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
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
                                                placeholder="example@company.com"
                                                name='email'
                                                value={email}
                                                onChange={e => onChange(e)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="password" className="mb-4">
                                        <Form.Label>Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="password"
                                                placeholder="Password@123"
                                                name='password'
                                                value={password}
                                                onChange={e => onChange(e)}
                                                minLength='6'
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="re_password" className="mb-4">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="password"
                                                placeholder="Password@123"
                                                name='re_password'
                                                value={re_password}
                                                onChange={e => onChange(e)}
                                                minLength='6'
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Register
                                    </Button>
                                </Form>
                                <div className="mt-3 mb-4 text-center">
                                    <span className="fw-normal">or login with</span>
                                </div>
                                <div className="d-flex justify-content-center my-4">
                                    <Button variant="outline-light"
                                            className="btn-icon-only btn-pill text-twitter me-2"
                                            onClick={continueWithGoogle}>
                                        <FontAwesomeIcon icon={faGoogle}/>
                                    </Button>
                                </div>
                                <div className="d-flex justify-content-center align-items-center mt-4">
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

export default connect(mapStateToProps, {signup})(Signup)
