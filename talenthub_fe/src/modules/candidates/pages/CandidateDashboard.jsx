import { Button, Card, Col, Row } from "react-bootstrap";
import { Briefcase, FileEarmarkText, PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthsContext } from "../../../app/provider/AuthsContext";

const CandidateDashboard = () => {
  const { user } = useContext(AuthsContext);

  return (
    <section className="container py-4">
      <div className="mb-4">
        <p className="text-primary fw-semibold mb-1">CANDIDATE SPACE</p>
        <h1 className="h3 fw-bold">Welcome, {user?.fullName}</h1>
        <p className="text-muted mb-0">
          Find a suitable job and follow your applications in one place.
        </p>
      </div>

      <Row className="g-3">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body>
              <Briefcase className="text-primary mb-3" size={28} />
              <h2 className="h5">Find jobs</h2>
              <p className="text-muted">Browse the latest open positions.</p>
              <Button as={Link} to="jobs" variant="primary">
                View jobs
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body>
              <FileEarmarkText className="text-success mb-3" size={28} />
              <h2 className="h5">My applications</h2>
              <p className="text-muted">Track your application status.</p>
              <Button as={Link} to="jobs" variant="outline-success">
                Explore jobs
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body>
              <PersonCircle className="text-info mb-3" size={28} />
              <h2 className="h5">Profile</h2>
              <p className="text-muted">Keep your candidate information ready.</p>
              <Button as={Link} to="/" variant="outline-info">
                Go to home
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default CandidateDashboard;
