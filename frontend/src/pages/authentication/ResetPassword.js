import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {Col, Row, Form, Card, Button, Container, InputGroup} from '@themesberg/react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {Routes} from "../../routes";
import {reset_password} from "../../actions/auth";


const ResetPassword = ({reset_password}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const {email} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/reset-password-confirm/uid/token'/>
    }

    return (
        <main>
            <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center">
                        <p className="text-center">
                            <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                                <FontAwesomeIcon icon={faAngleLeft} className="me-2"/> Back to sign in
                            </Card.Link>
                        </p>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <h3 className="mb-4">Reset password</h3>
                                <Form onSubmit={e => onSubmit(e)}>
                                    <Form.Group id="email" className="mb-4">
                                        <Form.Label>Your Email</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="email"
                                                placeholder="example@company.com"
                                                name='email'
                                                value={email}
                                                onChange={e => onChange(e)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Reset password
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};

export default connect(null, {reset_password})(ResetPassword)