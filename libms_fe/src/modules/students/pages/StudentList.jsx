import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router";

const StudentList = () => {
  return (
    <Container>
      <Row className="px-5 py-3">
        <Col md={2}>
          <h3>LOGO</h3>
        </Col>
        <Col className="align-items-end" md={10}>
          <p>{new Date().toLocaleDateString()}</p>
        </Col>
      </Row>
      <Row className="px-5 py-3">
        <h3>Student List</h3>

        <Form>
          <Row className="py-3">
            <Col md={4}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Search</Form.Label>
                <Form.Control type="text" placeholder="Search by name" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Filter by Class</Form.Label>
                <Form.Control as="select">
                  <option value="">All Classes</option>
                  <option value="class1">Class 1</option>
                  <option value="class2">Class 2</option>
                  <option value="class3">Class 3</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button variant="primary" type="submit">
                Search
              </Button>
              <Button as={Link} to="/students/new" variant="secondary" type="button" className="ms-2">
                Create New Student
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>

      <Row className="px-5">
        <h3>Student List Table</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Class</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>John Doe</td>
              <td>Class 1</td>
              <td>
                <Button as={Link} to="/students/1" variant="primary" size="sm" className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Jane Smith</td>
              <td>Class 2</td>
              <td>
                <Button as={Link} to="/students/3" variant="primary" size="sm" className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jane Smith</td>
              <td>Class 2</td>
              <td>
                <Button as={Link} to="/students/2" variant="primary" size="sm" className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Jane Smith</td>
              <td>Class 2</td>
              <td>
                <Button as={Link} to="/students/4" variant="primary" size="sm" className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>

      </Row>
    </Container>
  );
};

export default StudentList;
