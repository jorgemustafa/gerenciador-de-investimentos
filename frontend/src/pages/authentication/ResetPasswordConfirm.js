import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faUnlockAlt} from "@fortawesome/free-solid-svg-icons";
import {Col, Row, Form, Card, Button, Container, InputGroup} from '@themesberg/react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {Routes} from "../../routes";
import {reset_password_confirm} from "../../actions/auth";


const ResetPasswordConfirm = ({match, reset_password_confirm}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const {new_password, re_new_password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid
        const token = match.params.token

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/login'/>
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
                                    <Form.Group id="password_confirm" className="mb-4">
                                        <Form.Label>New Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="password"
                                                placeholder="New Password"
                                                name='new_password'
                                                value={new_password}
                                                onChange={e => onChange(e)}
                                                minLength='6'
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="re_password_confirm" className="mb-4">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="password"
                                                placeholder="Confirm Password"
                                                name='re_new_password'
                                                value={re_new_password}
                                                onChange={e => onChange(e)}
                                                minLength='6'
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

export default connect(null, {reset_password_confirm})(ResetPasswordConfirm)