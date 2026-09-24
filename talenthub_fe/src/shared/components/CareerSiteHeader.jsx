import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Briefcase } from 'react-bootstrap-icons'
import { Link } from 'react-router'

const CareerSiteHeader = ({ companyName = 'TechCorp' }) => {
  return (
    <Navbar expand="lg" className="bg-white border-bottom py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-bold text-dark">
          <span className="d-flex align-items-center justify-content-center rounded-2 bg-primary text-white p-2">
            <Briefcase size={16} />
          </span>
          {companyName}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="career-site-navigation" />
        <Navbar.Collapse id="career-site-navigation">
          <Nav className="mx-auto text-center">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About Us</Nav.Link>
            <Nav.Link href="#open-positions" active>Careers</Nav.Link>
            <Nav.Link href="#culture">Culture</Nav.Link>
            <Nav.Link href="#benefits">Benefits</Nav.Link>
          </Nav>

          <div className="d-flex justify-content-center align-items-center gap-3 mt-3 mt-lg-0">
            <Nav.Link as={Link} to="/login" className="text-dark">Login</Nav.Link>
            <Button href="#open-positions" variant="primary" className="px-4">
              Apply Now
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CareerSiteHeader
