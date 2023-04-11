import React, {useEffect, useState} from "react";
import {Col, Row, Card, Form} from '@themesberg/react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {EditEmail, EditLastName, EditName} from "./ProfileModal";


export const GeneralInfoForm = () => {

    // user info
    const [userLogged, setUserLogged] = useState("");
    let firstName = userLogged.first_name
    let lastName = userLogged.last_name
    let email = userLogged.email

    useEffect(() => {
        const loadData = () => {
            fetch(`${process.env.REACT_APP_API_URL}/api/user/`, {
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
    const [openModalName, setOpenModalName] = useState(false)
    const [openModalLastName, setOpenModalLastName] = useState(false)
    const [openModalEmail, setOpenModalEmail] = useState(false)

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
                                    setOpenModalName(true)
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
                                    setOpenModalLastName(true)
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
                                    setOpenModalEmail(true)
                                }}
                                >
                                    <FontAwesomeIcon icon={faPencilAlt} size="lg"/>
                                </a>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <EditName
                show={openModalName}
                close={() => {setOpenModalName(false)}}
            />
            <EditLastName
                show={openModalLastName}
                close={() => {setOpenModalLastName(false)}}
            />
            <EditEmail
                show={openModalEmail}
                close={() => {setOpenModalEmail(false)}}
            />
        </>
    )
};
