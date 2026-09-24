import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons'

const CareerSiteHero = () => {
  return (
    <section id="home" className="text-white py-5" style={{ background: 'linear-gradient(135deg, #4338ca, #7c3aed)' }}>
      <Container className="py-3">
        <div className="text-center">
          <h1 className="display-5 fw-bold mb-3">Join Our Team</h1>
          <p className="lead mb-4">Discover exciting opportunities and build your career with us</p>
        </div>

        <Form className="mx-auto" style={{ maxWidth: '760px' }}>
          <InputGroup className="bg-white rounded-pill p-1 shadow-sm">
            <InputGroup.Text className="bg-white border-0 rounded-pill text-muted">
              <Search size={19} />
            </InputGroup.Text>
            <Form.Control
              className="border-0 shadow-none"
              placeholder="Search by job title, skill, or keyword..."
              aria-label="Search jobs"
            />
            <Button variant="primary" className="rounded-pill px-4">
              Search
            </Button>
          </InputGroup>
        </Form>

        <Row className="g-2 justify-content-center mt-3">
          <Col xs={12} sm={4} md={3}>
            <Form.Select aria-label="Department" className="bg-transparent text-white border-white">
              <option className="text-dark">All Departments</option>
              <option className="text-dark">Engineering</option>
              <option className="text-dark">Design</option>
              <option className="text-dark">Marketing</option>
            </Form.Select>
          </Col>
          <Col xs={12} sm={4} md={3}>
            <Form.Select aria-label="Location" className="bg-transparent text-white border-white">
              <option className="text-dark">All Locations</option>
              <option className="text-dark">Ho Chi Minh City</option>
              <option className="text-dark">Hanoi</option>
              <option className="text-dark">Remote</option>
            </Form.Select>
          </Col>
          <Col xs={12} sm={4} md={3}>
            <Form.Select aria-label="Job type" className="bg-transparent text-white border-white">
              <option className="text-dark">All Types</option>
              <option className="text-dark">Full-time</option>
              <option className="text-dark">Contract</option>
              <option className="text-dark">Internship</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CareerSiteHero
