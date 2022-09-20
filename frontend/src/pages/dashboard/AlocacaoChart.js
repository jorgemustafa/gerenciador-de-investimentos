import {Card, Col, Row} from "@themesberg/react-bootstrap";
import {CircleChart} from "../../components/Charts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export const CircleChartWidget = (props) => {
  const { title, data = [] } = props;
  const series = data.map(d => d.value);

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col xs={12} xl={5} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0">
            <CircleChart series={series} />
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <h5 className="mb-3">{title}</h5>

            {data.map(d => (
              <h6 key={`circle-element-${d.id}`} className={`fw-normal text-${d.color}`}>
                <FontAwesomeIcon icon={d.icon} className={`icon icon-xs text-${d.color} w-20 me-1`} />
                {`${d.value}%`} {` ${d.label} `}
              </h6>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};