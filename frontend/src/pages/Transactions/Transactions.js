import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import Table from "./Table";



export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Extrato</h4>
          <p className="mb-0">Consulte seu extrato para recordar ou editar seus investimentos.</p>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={8} lg={8} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
          <Col xs={2} md={2} lg={2} xl={2}>
            <ButtonGroup>
            <Button variant="outline-primary" size="sm">Exportar</Button>
          </ButtonGroup>
          </Col>
        </Row>
      </div>

      <Table />
    </>
  );
};
