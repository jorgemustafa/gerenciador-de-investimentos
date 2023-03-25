import {Card, Table} from "@themesberg/react-bootstrap";
import React, {useEffect, useState} from "react";

export default () => {

    const [dataResponse, setDataResponse] = useState([])
    console.log(dataResponse)
    // get transactions list
    useEffect(() => {
        const loadData = () => {
        }
        fetch('http://localhost:8000/assets/list/', {
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
        const {name, pm, units, total_current, invested, performance, perc_wallet, type} = props;
        const perfVariant = performance > 0 ? "success" : "danger"

        return (
            <tr>
                <td>
          <span className="fw-normal">
            {name}
          </span>
                </td>
                <td>
          <span className="fw-normal">
            {pm !== '0.00' ? <>R${parseFloat(pm).toFixed(2)}</> : <>N/A</>}
          </span>
                </td>
                <td>
          <span className="fw-normal">
            {units}
          </span>
                </td>
                <td>
          <span className="fw-normal">
            R${invested}
          </span>
                </td>
                <td>
          <span className="fw-normal">
            R${total_current}
          </span>
                </td>
                <td>
          <span className={`fw-normal text-${perfVariant}`}>
            {performance}%
          </span>
                </td>
                <td>
          <span className="fw-normal">
            {perc_wallet}%
          </span>
                </td>
                <td>
          <span className="fw-normal">
            {type}
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
                        <th className="border-bottom">Preço Médio</th>
                        <th className="border-bottom">Unidades</th>
                        <th className="border-bottom">Total Investido</th>
                        <th className="border-bottom">Total Atual</th>
                        <th className="border-bottom">Valorização</th>
                        <th className="border-bottom">% na Carteira</th>
                        <th className="border-bottom">Tipo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataResponse.map(d => <TableRow key={`data-${d.id}`} {...d} />)}
                    </tbody>
                </Table>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-end">
                    <small className="fw-bold">
                        Mostrando <b>{dataResponse.length}</b> resultados
                    </small>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};