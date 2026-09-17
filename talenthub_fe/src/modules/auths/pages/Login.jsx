import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function Login({ onSwitchToRegister }) {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <Container
      fluid
      className="bg-light min-vh-100 d-flex justify-content-center py-4"
    >
      <Row className="w-100 justify-content-center mt-5">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card>
            <Card.Body className="p-4">
              <Card.Title className="text-center mb-4">Đăng nhập</Card.Title>
              <Form onSubmit={(event) => event.preventDefault()}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button className="w-100 py-3" type="submit">
                  Đăng nhập
                </Button>
              </Form>
              <p className="text-center mt-3 mb-0">
                Chưa có tài khoản?{" "}
                <Button
                  variant="link"
                  className="p-0"
                  type="button"
                  onClick={onSwitchToRegister}
                >
                  Đăng ký
                </Button>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
