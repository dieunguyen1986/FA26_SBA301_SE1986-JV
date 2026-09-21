import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { authsApi } from "../api/auths.api";

const Register = () => {
  // Logic
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: null, content: "" });
  const [errorMessages, setErrorMessages] = useState([]);
  // [{target: password, message: ""}]

  useEffect(() => {
    document.title = "Register";

    document.getElementById("fullName").focus();

    return () => {
      document.title = "Applicant Tracking System";
    };
  }, []);

  useEffect(() => {
    if (!message.type) return;

    const timer = setTimeout(() => {
      setMessage({ type: null, content: "" });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    console.log(`Fullname: ${fullName}`);

    // Call API
    const payload = { fullName: fullName, email: email, password: password };

    validate(payload);

    console.log(
      "Email error: " + errorMessages.some((error) => error.target === "email"),
    );

    if (errorMessages) {
      console.log("Error Message: " + errorMessages);
      return;
    } else {
      try {
        const response = await authsApi.register(payload);

        setMessage({ type: "success", content: response.message });
      } catch (error) {
        console.log(error);
        setMessage({
          type: "error",
          content: error?.message || "Register Fail",
        });
      }
    }
  };

  const validate = (payload) => {
    setErrorMessages([]);

    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{5,}$/;
    const PASSWORD_REGEX = /^[A-Za-z0-9%!@]{5}$/;

    if (!EMAIL_REGEX.test(payload.email)) {
      setErrorMessages(
        errorMessages.push({
          target: "email",
          message: "Email is  invalid format!",
        }),
      );
    }

    if (!PASSWORD_REGEX.test(password.password)) {
      setErrorMessages(
        errorMessages.push({
          target: "password",
          message: "Password is wrong format!",
        }),
      );
    }

    console.log(errorMessages);

    return !errorMessages;
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
          {message.type ? (
            <Alert
              className="mt-3"
              variant={message.type === "error" ? "danger" : "success"}
            >
              {message.content}
            </Alert>
          ) : (
            ""
          )}

          <hr />
          <Form className="g-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                controlId="fullName"
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
            {errorMessages ? (
              <Alert variant="danger">
                {
                  errorMessages.find((error) => error.target === "email")
                    .content
                }
              </Alert>
            ) : (
              ""
            )}

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
