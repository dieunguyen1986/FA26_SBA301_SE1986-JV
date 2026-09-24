import { Col, Container, Row } from 'react-bootstrap'
import { Facebook, Linkedin, Twitter } from 'react-bootstrap-icons'

const CareerSiteFooter = ({ companyName = 'TechCorp' }) => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row className="g-4">
          <Col md={5}>
            <div className="d-flex align-items-center gap-2 fw-bold mb-3">
              <span className="rounded-2 bg-primary px-2 py-1">T</span>
              {companyName}
            </div>
            <p className="text-white-50 small mb-0">Building the future of technology.<br />Ho Chi Minh City, Vietnam</p>
          </Col>
          <Col xs={6} md={3}>
            <h3 className="h6">Company</h3>
            <div className="d-grid gap-1">
              <a href="#about" className="text-white-50 text-decoration-none small">About Us</a>
              <a href="#culture" className="text-white-50 text-decoration-none small">Culture</a>
              <a href="#benefits" className="text-white-50 text-decoration-none small">Benefits</a>
            </div>
          </Col>
          <Col xs={6} md={3}>
            <h3 className="h6">Contact</h3>
            <div className="d-grid gap-1 text-white-50 small">
              <span>careers@techcorp.com</span>
              <span>+84 28 1234 5678</span>
            </div>
          </Col>
          <Col md={1} className="d-flex gap-2">
            <a href="#facebook" aria-label="Facebook" className="text-white-50"><Facebook /></a>
            <a href="#linkedin" aria-label="LinkedIn" className="text-white-50"><Linkedin /></a>
            <a href="#twitter" aria-label="Twitter" className="text-white-50"><Twitter /></a>
          </Col>
        </Row>
        <div className="border-top border-secondary mt-4 pt-3 text-center text-white-50 small">
          © 2026 {companyName}. All rights reserved. | Privacy Policy | Terms of Service
        </div>
      </Container>
    </footer>
  )
}

export default CareerSiteFooter
