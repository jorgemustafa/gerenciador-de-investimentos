import React, {useState} from 'react';
import {Modal, Button, Form, Row, Col} from '@themesberg/react-bootstrap';


export const EditName = (props) => {

    const [firstName, setFirstName] = useState('');
    const [message, setMessage] = useState('');

    // post form
    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/change/`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                    })
                })
            if (res.status === 200) {
                setMessage(<p className="text-success text-center">Nome alterado com sucesso!</p>);
                setTimeout(() => {
                        window.location.reload()
                    }, 1000
                )

            } else {
                setMessage(<p className="text-danger text-center">Um erro ocorreu: ${res.statusText}</p>)
            }
        } catch (err) {
            setMessage(<p className="text-danger text-center">Um erro ocorreu: ${err.message}</p>)
        }
    }

    return (
        <React.Fragment>
            <Modal as={Modal.Dialog} centered show={props.show} onHide={props.close} id="modal-firstName">
                <Modal.Header>
                    <Modal.Title className="h6">Alterar Nome</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={props.close}/>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={11} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Nome"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Modal.Footer>
                            <Button variant="secondary" type="submit">
                                Salvar
                            </Button>
                            <Button variant="link" className="text-gray ms-auto" onClick={props.close}>
                                Cancelar
                            </Button>
                        </Modal.Footer>
                    </Form>
                    <div className="message pt-2">{message ? <>{message}</> : null}</div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};


export const EditLastName = (props) => {

    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');

    // post form
    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/change/`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        lastName: lastName,
                    })
                })
            if (res.status === 200) {
                setMessage(<p className="text-success text-center">Sobrenome alterado com sucesso!</p>);
                setTimeout(() => {
                        window.location.reload()
                    }, 1000
                )
            } else {
                setMessage(<p className="text-danger text-center">Um erro ocorreu: ${res.statusText}</p>)
            }
        } catch (err) {
            setMessage(<p className="text-danger text-center">Um erro ocorreu: ${err.message}</p>)
        }
    }

    return (
        <React.Fragment>
            <Modal as={Modal.Dialog} centered show={props.show} onHide={props.close} id="modal-lastName">
                <Modal.Header>
                    <Modal.Title className="h6">Alterar Sobrenome</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={props.close}/>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={11} className="mb-3">
                                <Form.Group id="lastName">
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Sobrenome"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Modal.Footer>
                            <Button variant="secondary" type="submit">
                                Salvar
                            </Button>
                            <Button variant="link" className="text-gray ms-auto" onClick={props.close}>
                                Cancelar
                            </Button>
                        </Modal.Footer>
                    </Form>
                    <div className="message pt-2">{message ? <>{message}</> : null}</div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};


export const EditEmail = (props) => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // post form
    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/change/`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                    })
                })
            if (res.status === 200) {
                setMessage(<p className="text-success text-center">Email alterado com sucesso!</p>);
                setTimeout(() => {
                        window.location.reload()
                    }, 1000
                )
            } else {
                setMessage(<p className="text-danger text-center">Um erro ocorreu: ${res.statusText}</p>)
            }
        } catch (err) {
            setMessage(<p className="text-danger text-center">Um erro ocorreu: ${err.message}</p>)
        }
    }

    return (
        <React.Fragment>
            <Modal as={Modal.Dialog} centered show={props.show} onHide={props.close} id="modal-email">
                <Modal.Header>
                    <Modal.Title className="h6">Alterar Email</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={props.close}/>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={11} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="alterar@email.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Modal.Footer>
                            <Button variant="secondary" type="submit">
                                Salvar
                            </Button>
                            <Button variant="link" className="text-gray ms-auto" onClick={props.close}>
                                Cancelar
                            </Button>
                        </Modal.Footer>
                    </Form>
                    <div className="message pt-2">{message ? <>{message}</> : null}</div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};
