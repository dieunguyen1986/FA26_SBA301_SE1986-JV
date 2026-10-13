import { Briefcase, Save } from "react-bootstrap-icons";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthsContext } from "../../../app/provider/AuthsContext";

const RecruitmentJobCreate = () => {
  const { user } = useContext(AuthsContext);
  const basePath = user?.roles?.includes("ADMIN") ? "/admin" : "/recruiter";

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="mb-4">
        <p className="text-primary fw-semibold mb-1">QUẢN LÝ TUYỂN DỤNG</p>
        <h1 className="h3 fw-bold text-dark mb-1">Thêm mới tin tuyển dụng</h1>
        <p className="text-muted mb-0">
          Tạo thông tin vị trí mới để bắt đầu quy trình tuyển dụng.
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4 p-lg-5">
          <div className="d-flex align-items-center gap-3 mb-4">
            <span className="rounded-3 bg-light text-primary p-3">
              <Briefcase size={24} />
            </span>
            <div>
              <h2 className="h5 fw-bold mb-1">Thông tin tin tuyển dụng</h2>
              <p className="text-muted small mb-0">
                Điền các thông tin cơ bản của vị trí cần tuyển.
              </p>
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={8}>
                <Form.Group controlId="job-title">
                  <Form.Label className="fw-semibold">Tiêu đề tin tuyển dụng</Form.Label>
                  <Form.Control placeholder="Ví dụ: Senior Java Developer" required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="job-department">
                  <Form.Label className="fw-semibold">Phòng ban</Form.Label>
                  <Form.Select defaultValue="">
                    <option value="">Chọn phòng ban</option>
                    <option value="engineering">Engineering</option>
                    <option value="design">Design</option>
                    <option value="product">Product</option>
                    <option value="marketing">Marketing</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="job-location">
                  <Form.Label className="fw-semibold">Địa điểm làm việc</Form.Label>
                  <Form.Control placeholder="Ví dụ: Ho Chi Minh City" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="job-employment-type">
                  <Form.Label className="fw-semibold">Loại hình</Form.Label>
                  <Form.Select defaultValue="full-time">
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="job-work-mode">
                  <Form.Label className="fw-semibold">Hình thức</Form.Label>
                  <Form.Select defaultValue="hybrid">
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">Onsite</option>
                    <option value="remote">Remote</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="job-salary-min">
                  <Form.Label className="fw-semibold">Lương tối thiểu</Form.Label>
                  <Form.Control type="number" min="0" placeholder="VNĐ" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="job-salary-max">
                  <Form.Label className="fw-semibold">Lương tối đa</Form.Label>
                  <Form.Control type="number" min="0" placeholder="VNĐ" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="job-deadline">
                  <Form.Label className="fw-semibold">Hạn ứng tuyển</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group controlId="job-description">
                  <Form.Label className="fw-semibold">Mô tả công việc</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Mô tả trách nhiệm và công việc chính..."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="job-requirements">
                  <Form.Label className="fw-semibold">Yêu cầu ứng viên</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Mỗi yêu cầu viết trên một dòng..."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="job-benefits">
                  <Form.Label className="fw-semibold">Quyền lợi</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Mỗi quyền lợi viết trên một dòng..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-4 pt-4 border-top">
              <Button as={Link} to={`${basePath}/jobs`} variant="light">
                Hủy
              </Button>
              <Button type="submit" variant="primary" className="d-flex align-items-center gap-2">
                <Save size={16} />
                Lưu tin tuyển dụng
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RecruitmentJobCreate;
