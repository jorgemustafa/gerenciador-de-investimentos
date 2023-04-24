import React, {useEffect, useState} from "react";
import {Col, Container, Form, Row} from '@themesberg/react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {EditEmail, EditLastName, EditName} from "./ProfileModal";
import BgImage from "../assets/img/illustrations/signin.svg";


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
        <main>
            <section className="h-100 bg-soft d-flex align-items-center my-4">
                <Container>
                    <Row className="justify-content-center" style={{backgroundImage: `url(${BgImage})`}}>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border border-light rounded p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-3">Dados da Conta</h3>
                                </div>
                                <Form>
                                    <Row>
                                        <Col md={10} xs={10} sm={10} className="mb-3">
                                            <Form.Group id="firstName">
                                                <Form.Label>Primeiro Nome</Form.Label>
                                                <Form.Control required type="text" value={firstName} readOnly/>
                                            </Form.Group>
                                        </Col>
                                        <Col md={2} xs={2} sm={2} className="pt-5">
                                            <a onClick={() => {
                                                setOpenModalName(true)
                                            }}
                                            >
                                                <FontAwesomeIcon icon={faPencilAlt} size="lg"/>
                                            </a>
                                        </Col>
                                        <Col md={10} xs={10} sm={10} className="mb-3">
                                            <Form.Group id="lastName">
                                                <Form.Label>Último Nome</Form.Label>
                                                <Form.Control required type="text" value={lastName} readOnly/>
                                            </Form.Group>
                                        </Col>
                                        <Col md={2} xs={2} sm={2} className="pt-5">
                                            <a onClick={() => {
                                                setOpenModalLastName(true)
                                            }}
                                            >
                                                <FontAwesomeIcon icon={faPencilAlt} size="lg"/>
                                            </a>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={10} xs={10} sm={10} className="mb-3">
                                            <Form.Group id="email">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control required type="email" value={email} readOnly/>
                                            </Form.Group>
                                        </Col>
                                        <Col md={2} xs={2} sm={2} className="pt-5">
                                            <a onClick={() => {
                                                setOpenModalEmail(true)
                                            }}
                                            >
                                                <FontAwesomeIcon icon={faPencilAlt} size="lg"/>
                                            </a>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <EditName
                show={openModalName}
                close={() => {
                    setOpenModalName(false)
                }}
            />
            <EditLastName
                show={openModalLastName}
                close={() => {
                    setOpenModalLastName(false)
                }}
            />
            <EditEmail
                show={openModalEmail}
                close={() => {
                    setOpenModalEmail(false)
                }}
            />
        </main>
    )
};
