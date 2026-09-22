import {
  Card,
  Container,
  Table,
  Form,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";

import { useEffect, useState } from "react";
import ApplicantCard from "./ApplicantCard";
import { candidateApi } from "../api/candidate.api";

const ApplicantList = () => {
  const [applicants, setAppplicants] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await candidateApi.findAll();
        setAppplicants(response.data);

        const statusRes = await candidateApi.findAllStatus();
        setStatusList(statusRes.data);
      } catch (error) {
        console.log(error?.message || "Fail fetching data");
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid className="p-5 bg-light border rounded-3">
      <Row>
        <Col md={12}>
          <h1>PRODUCT LIST</h1>
          <hr />
          <Row className="g-2 my-3 mb-5">
            <Form className="d-flex justify-content-left">
              <Col md={4} className="mx-2">
                <Form.Control
                  className="py-3"
                  type="text"
                  placeholder="Search by applicant name"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </Col>
              <Col md={3} className="mx-2">
                <Form.Select aria-label="Status" className="py-3">
                  <option value="">All</option>
                  {statusList.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={3} className="mx-2">
                <Dropdown className="py-1">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Sort by
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Asc</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Desc</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Form>
          </Row>
          <Card>
            <Table>
              <thead>
                <tr>
                  <th className="text-muted">Candidate</th>
                  <th className="text-muted">Postion</th>
                  <th className="text-muted">Status</th>
                  <th className="text-muted">Applied</th>
                  <th className="text-muted">Action</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((item) => {
                  return <ApplicantCard applicant={item} key={item.id} />;
                })}
                ;
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicantList;
