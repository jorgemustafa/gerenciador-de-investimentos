import React, {useEffect, useState} from "react";
import {Col, Row, Card, Form, Button} from '@themesberg/react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "./ProfileModal";


export const GeneralInfoForm = () => {

    // user info
    const [userLogged, setUserLogged] = useState("");
    let firstName = userLogged.first_name
    let lastName = userLogged.last_name
    let email = userLogged.email

    useEffect(() => {
        const loadData = () => {
            fetch('http://localhost:8000/api/user/', {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
                .then(response => response.json())
                .then(data => setUserLogged(data))
                .catch(err => {
                    console.log(err)
                })
        }
        loadData()
    }, [])

    // modal
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">Dados da Conta</h5>
                    <Form>
                        <Row>
                            <Col md={11} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Primeiro Nome</Form.Label>
                                    <Form.Control required type="text" value={firstName} readOnly/>
                                </Form.Group>
                            </Col>
                            <Col md={1} className="pt-5">
                                <a onClick={() => {
                                    setOpenModal(true)
                                }}
                                >
                                    <FontAwesomeIcon icon={faPencilAlt} size="lg"/>
                                </a>
                            </Col>
                            <Col md={11} className="mb-3">
                                <Form.Group id="lastName">
                                    <Form.Label>Último Nome</Form.Label>
                                    <Form.Control required type="text" value={lastName} readOnly/>
                                </Form.Group>
                            </Col>
                            <Col md={1} className="pt-5">
                                <a onClick={() => {
                                    setOpenModal(true)
                                }}
                                >
                                    <FontAwesomeIcon icon={faPencilAlt} size="lg"/>
                                </a>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={11} className="mb-3">
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required type="email" value={email} readOnly/>
                                </Form.Group>
                            </Col>
                            <Col md={1} className="pt-5">
                                <a onClick={() => {
                                    setOpenModal(true)
                                }}
                                >
                                    <FontAwesomeIcon icon={faPencilAlt} size="lg"/>
                                </a>
                            </Col>
                        </Row>
                        <div className="mt-3">
                            <Button variant="primary" type="submit">Salvar</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <ProfileModal
                show={openModal}
                close={() => {setOpenModal(false)}}
            />
        </>
    )
};
