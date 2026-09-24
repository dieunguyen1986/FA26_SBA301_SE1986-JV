import { Badge, Button, Card, Stack } from 'react-bootstrap'
import { ArrowRight, Clock, GeoAlt } from 'react-bootstrap-icons'

const CareerSiteJobCard = ({ job }) => {
  return (
    <Card className={`h-100 border-0 border-start border-3 border-${job.color} shadow-sm`}>
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
          <Badge bg="light" text={job.color} className="text-uppercase">
            {job.department}
          </Badge>
          <Badge bg="white" className="border border-success text-success rounded-pill fw-normal">
            {job.type}
          </Badge>
        </div>

        <Card.Title className="h5 fw-bold mb-3">{job.title}</Card.Title>

        <Stack direction="horizontal" gap={3} className="text-muted small mb-3">
          <span><GeoAlt size={14} className="me-1" />{job.location}</span>
          <span><Clock size={14} className="me-1" />{job.posted}</span>
        </Stack>

        <Card.Text className="text-muted small mb-3">{job.description}</Card.Text>

        <Stack direction="horizontal" gap={2} className="flex-wrap">
          {job.tags.map((tag) => (
            <Badge key={tag} bg="light" text="secondary" className="fw-normal">
              {tag}
            </Badge>
          ))}
        </Stack>
      </Card.Body>
      <Card.Footer className="bg-white border-top px-4 py-3">
        <Button variant="link" href={`#job-${job.id}`} className="p-0 text-primary text-decoration-none small fw-semibold">
          View Details <ArrowRight size={14} />
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default CareerSiteJobCard
