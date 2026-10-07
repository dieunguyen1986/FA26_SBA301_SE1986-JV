import { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { authsApi } from "../api/auths.api";
import { AuthsContext } from "../../../app/provider/AuthsContext";
import { getRoleHomePath } from "../../../app/router/rolePaths";

function Login({ onSwitchToRegister }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthsContext);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authsApi.login(user);
      const resData = response.data;
      const homePath = getRoleHomePath(resData.roles);

      if (!homePath) {
        setMessage("This account does not have a supported role.");
        return;
      }

      login(resData);
      navigate(homePath, { replace: true });
    } catch (error) {
      setMessage(error?.response?.data?.message || error?.message || "Credential is wrong!");
    }
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
              <Form onSubmit={handleLogin}>
                {message && <div className="alert alert-danger">{message}</div>}
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
                  as={Link}
                  to="/register"
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
