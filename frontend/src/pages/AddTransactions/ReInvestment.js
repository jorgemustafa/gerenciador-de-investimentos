import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "@themesberg/react-bootstrap";

export default () => {

    const [assetsList, setAssetsList] = useState([])


    // get assets by user
    useEffect(() => {
        const loadData = () => {
        }
        fetch('http://localhost:8000/assets/list/', {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
            .then(response => response.json())
            .then(data => setAssetsList(data))
            .catch(err => {
                console.log('Reinvestment.js', err)
            })
        loadData()
    }, [])

    return (
        <main>
            <section className="bg-soft d-flex align-items-center my-4">
                <Container className="h-auto justify-content-center">
                    <Row className="justify-content-center">
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border border-light rounded p-4 p-lg-5 w-100 fmxw-500 text-md-center">
                                {assetsList.map(a => <h4>{a}</h4>)}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}