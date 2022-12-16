import React from 'react';
import {Modal, Button} from '@themesberg/react-bootstrap';


export default (props) => {

    return (
        <React.Fragment>
            <Modal as={Modal.Dialog} centered show={props.show} onHide={props.close}>
                <Modal.Header>
                    <Modal.Title className="h6">Terms of Service</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={props.close}/>
                </Modal.Header>
                <Modal.Body>
                    <p>With less than a month to go before the European Union enacts new consumer privacy laws for its
                        citizens, companies around the world are updating their terms of service agreements to
                        comply.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Salvar
                    </Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={props.close}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};
