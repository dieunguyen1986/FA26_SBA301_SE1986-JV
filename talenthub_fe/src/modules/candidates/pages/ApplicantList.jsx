import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {}, []);

  return (
    <Container>
      <Row>
        <Col md={12} className="p-5">
          <h3>Applicant List</h3>

          <Table></Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicantList;
