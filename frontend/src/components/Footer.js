
import React from "react";
import moment from "moment-timezone";
import { Row, Col, Card } from '@themesberg/react-bootstrap';

export default (props) => {
  const currentYear = moment().get("year");


  return (
    <div>
      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={12}>
            <p className="mb-0 text-xl-right">
              Copyright © {`${currentYear} `}
              <Card.Link href="https://www.jorgemustafa.com.br" target="_blank" className="text-blue text-decoration-none fw-normal">
                Jorge Mustafa Web Development
              </Card.Link>
            </p>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
