import { Button, Card } from 'react-bootstrap'
import { ArrowLeft, CheckCircle } from 'react-bootstrap-icons'
import { Link } from 'react-router'

const AdminFeaturePage = ({ title, description }) => {
  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="text-center py-5">
        <CheckCircle size={42} className="text-primary mb-3" />
        <h1 className="h4 fw-bold text-dark">{title}</h1>
        <p className="text-muted mb-4">{description}</p>
        <Button as={Link} to="/admin" variant="light" className="text-primary">
          <ArrowLeft size={16} className="me-2" /> Về dashboard
        </Button>
      </Card.Body>
    </Card>
  )
}

export default AdminFeaturePage
