import {Button, ButtonGroup, Card, Dropdown, Table} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEllipsisH, faEye, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";

export default () => {

    const [dataResponse, setDataResponse] = useState([])

    // get extrato list
    useEffect(() => {
        const loadData = () => {
        }
        fetch('http://localhost:8000/assets/list/extrato/', {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
            .then(response => response.json())
            .then(data => setDataResponse(data))
            .catch(err => {
                console.log('data.js', err)
            })
        loadData()
    }, [])

    const TableRow = (props) => {
        const {nome, cotacao, unidades, saldo, inclusao, tipo_transacao} = props;
        const tipoVariant = tipo_transacao === "compra" ? "success" : "danger"

        return (
            <tr>
                <td>
          <span className="fw-normal">
            {nome}
          </span>
                </td>
                <td>
          <span className="fw-normal">
            {cotacao !== '0.00' ? <>R${parseFloat(cotacao).toFixed(2)}</> : <>N/A</>}
          </span>
                </td>
                <td>
          <span className="fw-normal">
            {unidades}
          </span>
                </td>
                <td>
          <span className="fw-normal">
            R${saldo}
          </span>
                </td>
                <td>
          <span className="fw-normal">
            {inclusao}
          </span>
                </td>
                <td>
          <span className={`fw-normal text-${tipoVariant}`}>
            {tipo_transacao.toUpperCase()}
          </span>
                </td>
            </tr>
        );
    };

    return (
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
            <Card.Body className="pt-0">
                <Table hover className="user-table align-items-center">
                    <thead>
                    <tr>
                        <th className="border-bottom">Ativo</th>
                        <th className="border-bottom">Cotação</th>
                        <th className="border-bottom">Unidades</th>
                        <th className="border-bottom">Saldo</th>
                        <th className="border-bottom">Inclusão</th>
                        <th className="border-bottom">Tipo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataResponse.map(d => <TableRow key={`data-${d.id}`} {...d} />)}
                    </tbody>
                </Table>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-end">
                    {/*<Nav>*/}
                    {/*    <Pagination className="mb-2 mb-lg-0">*/}
                    {/*        <Pagination.Prev>*/}
                    {/*            Previous*/}
                    {/*        </Pagination.Prev>*/}
                    {/*        <Pagination.Item active>1</Pagination.Item>*/}
                    {/*        <Pagination.Item>2</Pagination.Item>*/}
                    {/*        <Pagination.Item>3</Pagination.Item>*/}
                    {/*        <Pagination.Item>4</Pagination.Item>*/}
                    {/*        <Pagination.Item>5</Pagination.Item>*/}
                    {/*        <Pagination.Next>*/}
                    {/*            Next*/}
                    {/*        </Pagination.Next>*/}
                    {/*    </Pagination>*/}
                    {/*</Nav>*/}
                    <small className="fw-bold">
                        Mostrando <b>{dataResponse.length}</b> resultados
                    </small>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};