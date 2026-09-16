import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { authsApi } from "../api/auths.api";

const Register = () => {
  // Logic
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    console.log(`Fullname: ${fullName}`);

    // Call API
    const response = authsApi.register({ fullName, email, password });
  };

  // UI
  return (
    <Container className="">
      <Row className="d-flex justify-content-center mt-3">
        <Col md={6} className="p-5 rounded-5 border">
          <h2 className="d-flex justify-content-center">Create an Account</h2>
          <p className="d-flex justify-content-center">
            Join our talent community to track your applications.
          </p>

          <Button
            variant="light"
            className="py-3 mt-3 border rounded-5"
            style={{ width: "100%" }}
          >
            Continue with Google
          </Button>
          <Button
            variant="light"
            className="py-3 mt-3 border rounded-5"
            style={{ width: "100%" }}
          >
            Continue with LinkedIn
          </Button>

          <hr />
          <Form className="g-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                className="py-3"
                type="text"
                placeholder="e.g Nguyen Van A"
                name="fullName"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3 mt-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                className="py-3"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3 mt-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="py-3"
                placeholder="********"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="info"
              className="py-3 my-3"
              style={{ width: "100%" }}
            >
              Create Account
            </Button>
          </Form>
          <div className="d-flex justify-content-center">
            Already have an account?{" "}
            <span>
              <a>Sign in</a>
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
