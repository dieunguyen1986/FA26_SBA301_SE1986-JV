import { Badge, Col, Container, Form, Row } from 'react-bootstrap'
import { ChevronDown } from 'react-bootstrap-icons'
import CareerSiteJobCard from '../components/CareerSiteJobCard.jsx'

const jobs = [
  { id: 1, title: 'Senior Java Developer', department: 'Engineering', location: 'Ho Chi Minh City, Vietnam', posted: 'Posted 2 days ago', type: 'Full-time', color: 'primary', description: 'Design, develop, and maintain high-quality applications using Spring Boot framework.', tags: ['Java', 'Spring Boot', 'PostgreSQL'] },
  { id: 2, title: 'UI/UX Designer', department: 'Design', location: 'Ho Chi Minh City, Vietnam', posted: 'Posted 5 days ago', type: 'Full-time', color: 'primary', description: 'Create intuitive and visually stunning user interfaces. Conduct user research and usability testing.', tags: ['Figma', 'UX Research', 'Prototyping'] },
  { id: 3, title: 'DevOps Engineer', department: 'Engineering', location: 'Hanoi, Vietnam', posted: 'Posted 1 week ago', type: 'Full-time', color: 'primary', description: 'Build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure system reliability.', tags: ['Docker', 'K8S', 'AWS', 'Terraform'] },
  { id: 4, title: 'Product Manager', department: 'Product', location: 'Ho Chi Minh City, Vietnam', posted: 'Posted 3 days ago', type: 'Full-time', color: 'danger', description: 'Define product vision, roadmap, and strategy. Work closely with engineering and design teams.', tags: ['Agile', 'Jira', 'Roadmap'] },
  { id: 5, title: 'Digital Marketing Specialist', department: 'Marketing', location: 'Remote', posted: 'Posted 1 day ago', type: 'Contract', color: 'warning', description: 'Plan and execute digital marketing campaigns across multiple channels including SEO, SEM, social media.', tags: ['SEO', 'Google Ads', 'Analytics'] },
  { id: 6, title: 'Data Analyst', department: 'Analytics', location: 'Ho Chi Minh City, Vietnam', posted: 'Posted 4 days ago', type: 'Full-time', color: 'success', description: 'Analyze business data, build dashboards, and provide actionable insights to support decision-making.', tags: ['SQL', 'Python', 'Power BI'] },
]

const CareerSiteJobList = ({ jobItems = jobs }) => {
  return (
    <section id="open-positions" className="bg-light py-4 py-md-5">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            <h2 className="h4 fw-bold mb-0">Open Positions</h2>
            <Badge bg="primary" className="rounded-pill fw-normal">{jobItems.length} openings</Badge>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small">Sort by:</span>
            <div className="position-relative">
              <Form.Select size="sm" aria-label="Sort jobs" className="pe-5">
                <option>Most Recent</option>
                <option>Department</option>
                <option>Location</option>
              </Form.Select>
              <ChevronDown className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted" size={14} />
            </div>
          </div>
        </div>

        <Row className="g-3">
          {jobItems.map((job) => (
            <Col key={job.id} md={6}>
              <CareerSiteJobCard job={job} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default CareerSiteJobList
