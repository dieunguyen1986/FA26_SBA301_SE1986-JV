import { Badge, Button, Card, Col, ProgressBar, Row, Table } from 'react-bootstrap'
import {
  ArrowUpShort,
  Calendar3,
  CheckCircle,
  ChevronRight,
  Clock,
  People,
  Plus,
  ThreeDots,
} from 'react-bootstrap-icons'
import { Link } from 'react-router'

const summaryCards = [
  { label: 'Tin tuyển dụng đang mở', value: '24', change: '+3 tháng này', icon: Calendar3, color: 'primary' },
  { label: 'Ứng viên mới', value: '186', change: '+12,5% so với tháng trước', icon: People, color: 'success' },
  { label: 'Lịch phỏng vấn tuần này', value: '18', change: '5 lịch hôm nay', icon: Clock, color: 'warning' },
  { label: 'Tỷ lệ tuyển dụng', value: '68%', change: '+8,2% so với tháng trước', icon: CheckCircle, color: 'info' },
]

const AdminDashdoard = () => {
  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <p className="text-primary fw-semibold mb-1">TỔNG QUAN TUYỂN DỤNG</p>
          <h1 className="h3 fw-bold text-dark mb-1">Chào buổi sáng, Nguyễn Minh!</h1>
          <p className="text-muted mb-0">Theo dõi tiến độ tuyển dụng của đội ngũ trong hôm nay.</p>
        </div>
        <Button as={Link} to="/admin/jobs" variant="primary" className="d-inline-flex align-items-center gap-2 align-self-start">
          <Plus size={18} /> Đăng tin tuyển dụng
        </Button>
      </div>

      <Row className="g-3 mb-4">
        {summaryCards.map(({ label, value, change, icon: Icon, color }) => (
          <Col key={label} sm={6} xl={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span className={`rounded-3 bg-light text-${color} p-2`}>
                    <Icon size={20} />
                  </span>
                  <ThreeDots className="text-muted" />
                </div>
                <div className="text-muted small mb-1">{label}</div>
                <div className="h3 fw-bold text-dark mb-2">{value}</div>
                <div className="small text-success d-flex align-items-center gap-1">
                  <ArrowUpShort size={16} /> {change}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-3">
        <Col xl={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center pt-4 px-4">
              <div>
                <h2 className="h5 fw-bold mb-1">Tin tuyển dụng nổi bật</h2>
                <p className="text-muted small mb-0">Hiệu suất của các vị trí đang mở</p>
              </div>
              <Button as={Link} to="/admin/jobs" variant="link" className="text-decoration-none p-0">
                Xem tất cả <ChevronRight size={15} />
              </Button>
            </Card.Header>
            <Card.Body className="px-4 pb-4">
              <Table responsive hover className="align-middle mb-0">
                <thead>
                  <tr className="text-muted small">
                    <th className="fw-normal border-0">Vị trí tuyển dụng</th>
                    <th className="fw-normal border-0">Ứng viên</th>
                    <th className="fw-normal border-0">Trạng thái</th>
                    <th className="fw-normal border-0 text-end">Tiến độ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><div className="fw-semibold">Senior Product Designer</div><small className="text-muted">Hà Nội · Toàn thời gian</small></td>
                    <td>42 hồ sơ</td>
                    <td><Badge bg="success" className="fw-normal">Đang tuyển</Badge></td>
                    <td><ProgressBar now={75} variant="primary" className="mb-1" style={{ height: '6px' }} /><small className="text-muted d-block text-end">75%</small></td>
                  </tr>
                  <tr>
                    <td><div className="fw-semibold">Frontend Developer</div><small className="text-muted">Hồ Chí Minh · Hybrid</small></td>
                    <td>68 hồ sơ</td>
                    <td><Badge bg="success" className="fw-normal">Đang tuyển</Badge></td>
                    <td><ProgressBar now={52} variant="info" className="mb-1" style={{ height: '6px' }} /><small className="text-muted d-block text-end">52%</small></td>
                  </tr>
                  <tr>
                    <td><div className="fw-semibold">Marketing Lead</div><small className="text-muted">Đà Nẵng · Toàn thời gian</small></td>
                    <td>31 hồ sơ</td>
                    <td><Badge bg="warning" text="dark" className="fw-normal">Sắp đóng</Badge></td>
                    <td><ProgressBar now={88} variant="warning" className="mb-1" style={{ height: '6px' }} /><small className="text-muted d-block text-end">88%</small></td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center pt-4 px-4">
              <div>
                <h2 className="h5 fw-bold mb-1">Việc cần làm</h2>
                <p className="text-muted small mb-0">Các hoạt động đang chờ xử lý</p>
              </div>
              <ThreeDots className="text-muted" />
            </Card.Header>
            <Card.Body className="px-4">
              <div className="d-flex align-items-center gap-3 border-bottom py-3">
                <span className="rounded-circle bg-light text-warning p-2"><Clock size={18} /></span>
                <div className="flex-grow-1"><div className="fw-semibold small">Duyệt 12 hồ sơ mới</div><small className="text-muted">Cần hoàn thành hôm nay</small></div>
                <Badge bg="warning" text="dark">12</Badge>
              </div>
              <div className="d-flex align-items-center gap-3 border-bottom py-3">
                <span className="rounded-circle bg-light text-primary p-2"><Calendar3 size={18} /></span>
                <div className="flex-grow-1"><div className="fw-semibold small">Phỏng vấn sắp tới</div><small className="text-muted">5 lịch trong hôm nay</small></div>
                <Badge bg="primary">5</Badge>
              </div>
              <div className="d-flex align-items-center gap-3 py-3">
                <span className="rounded-circle bg-light text-success p-2"><CheckCircle size={18} /></span>
                <div className="flex-grow-1"><div className="fw-semibold small">Cập nhật kết quả</div><small className="text-muted">3 ứng viên chờ phản hồi</small></div>
                <Badge bg="success">3</Badge>
              </div>
            </Card.Body>
            <Card.Footer className="bg-white border-0 px-4 pb-4">
              <Button as={Link} to="/admin/interviews" variant="light" className="w-100 text-primary">
                Mở danh sách công việc <ChevronRight size={15} />
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AdminDashdoard
