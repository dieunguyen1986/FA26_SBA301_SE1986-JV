import { useState } from 'react'
import { Col, Container, Offcanvas, Row } from 'react-bootstrap'
import { Outlet } from 'react-router'
import AdminFooter from '../../shared/components/AdminFooter'
import AdminHeader from '../../shared/components/AdminHeader'
import AdminSidebar from '../../shared/components/AdminSidebar'

const AdminLayout = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  const closeMobileSidebar = () => setShowMobileSidebar(false)

  return (
    <div className="min-vh-100 bg-light">
      <AdminHeader onMenuClick={() => setShowMobileSidebar(true)} />

      <Container fluid className="px-0">
        <Row className="g-0">
          <Col lg={3} xl={2} className="d-none d-lg-block bg-white border-end">
            <AdminSidebar />
          </Col>

          <Col lg={9} xl={10}>
            <main className="min-vh-100 p-3 p-md-4 p-xl-5">
              <Outlet />
            </main>
          </Col>
        </Row>
      </Container>

      <AdminFooter />

      <Offcanvas
        show={showMobileSidebar}
        onHide={closeMobileSidebar}
        placement="start"
        className="d-lg-none"
        aria-labelledby="mobile-sidebar-title"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="mobile-sidebar-title">TalentHub</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <AdminSidebar onNavigate={closeMobileSidebar} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default AdminLayout
