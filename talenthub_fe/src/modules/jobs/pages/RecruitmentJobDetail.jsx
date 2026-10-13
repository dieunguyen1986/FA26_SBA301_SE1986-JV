import { useContext } from "react";
import {
  ArrowLeft,
  Briefcase,
  Calendar3,
  Clock,
  CurrencyDollar,
  GeoAlt,
  Pencil,
} from "react-bootstrap-icons";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router";
import { AuthsContext } from "../../../app/provider/AuthsContext";

const fallbackJob = {
  title: "Senior Java Developer",
  departmentName: "Engineering",
  location: "Ho Chi Minh City",
  salaryMin: 30000000,
  salaryMax: 50000000,
  status: "OPEN",
  deadline: "2026-12-31",
  employmentType: "Full-time",
  workMode: "Hybrid",
  experience: "2+ years",
  description:
    "We are looking for a Senior Java Developer to build reliable services for our growing platform.",
  requirements: [
    "At least 2 years of experience with Java and Spring Boot.",
    "Good understanding of REST APIs and relational databases.",
    "Able to work with product and engineering teams.",
  ],
  benefits: [
    "Competitive salary and performance bonus.",
    "Professional development and training budget.",
    "Flexible hybrid working environment.",
  ],
};

const formatCurrency = (value) =>
  value == null ? "Thỏa thuận" : `${value.toLocaleString("vi-VN")} VND`;

const formatDate = (value) => {
  if (!value) return "Chưa cập nhật";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const RecruitmentJobDetail = () => {
  const { jobId } = useParams();

  
  const location = useLocation();
  const { user } = useContext(AuthsContext);
  const basePath = user?.roles?.includes("ADMIN") ? "/admin" : "/recruiter";
  const job = {
    ...fallbackJob,
    ...location.state?.job,
    id: location.state?.job?.id || jobId,
  };
  const statusLabel = job.status === "OPEN" ? "Đang tuyển" : job.status;

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div className="d-flex flex-wrap gap-2">
          <Button
            as={Link}
            to={`${basePath}/jobs`}
            variant="light"
            className="text-primary border d-flex align-items-center gap-2"
          >
            <ArrowLeft size={16} />
            Quay lại danh sách
          </Button>
          <Button
            type="button"
            variant="primary"
            className="d-flex align-items-center gap-2"
            title="Chức năng chỉnh sửa sẽ được cập nhật sau"
          >
            <Pencil size={16} />
            Chỉnh sửa
          </Button>
        </div>
        <Badge bg={job.status === "OPEN" ? "success" : "secondary"} className="align-self-start">
          {statusLabel}
        </Badge>
      </div>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4 p-lg-5">
          <div className="d-flex align-items-start gap-3 mb-4">
            <span className="rounded-3 bg-light text-primary p-3">
              <Briefcase size={28} />
            </span>
            <div>
              <p className="text-primary fw-semibold mb-1">CHI TIẾT TIN TUYỂN DỤNG</p>
              <h1 className="h3 fw-bold text-dark mb-2">{job.title}</h1>
              <p className="text-muted mb-0">Mã tin: {job.id}</p>
            </div>
          </div>

          <Row className="g-3">
            <Col sm={6} lg={3}>
              <div className="border rounded-3 p-3 h-100">
                <small className="text-muted d-block mb-1">Phòng ban</small>
                <span className="fw-semibold">{job.departmentName}</span>
              </div>
            </Col>
            <Col sm={6} lg={3}>
              <div className="border rounded-3 p-3 h-100">
                <small className="text-muted d-block mb-1">Địa điểm</small>
                <span className="fw-semibold d-flex align-items-center gap-2">
                  <GeoAlt className="text-primary" /> {job.location}
                </span>
              </div>
            </Col>
            <Col sm={6} lg={3}>
              <div className="border rounded-3 p-3 h-100">
                <small className="text-muted d-block mb-1">Mức lương</small>
                <span className="fw-semibold d-flex align-items-center gap-2">
                  <CurrencyDollar className="text-success" />
                  {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
                </span>
              </div>
            </Col>
            <Col sm={6} lg={3}>
              <div className="border rounded-3 p-3 h-100">
                <small className="text-muted d-block mb-1">Hạn ứng tuyển</small>
                <span className="fw-semibold d-flex align-items-center gap-2">
                  <Calendar3 className="text-warning" /> {formatDate(job.deadline)}
                </span>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h5 fw-bold mb-3">Mô tả công việc</h2>
              <p className="text-muted mb-0">{job.description}</p>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h2 className="h5 fw-bold mb-3">Yêu cầu ứng viên</h2>
              <ul className="text-muted mb-0">
                {job.requirements.map((requirement) => (
                  <li key={requirement} className="mb-2">
                    {requirement}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <h2 className="h5 fw-bold mb-3">Thông tin công việc</h2>
              <div className="d-flex align-items-center gap-3 border-bottom py-3">
                <Briefcase className="text-primary" size={20} />
                <div>
                  <small className="text-muted d-block">Loại hình</small>
                  <span className="fw-semibold">{job.employmentType}</span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 border-bottom py-3">
                <GeoAlt className="text-primary" size={20} />
                <div>
                  <small className="text-muted d-block">Hình thức làm việc</small>
                  <span className="fw-semibold">{job.workMode}</span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 pt-3">
                <Clock className="text-primary" size={20} />
                <div>
                  <small className="text-muted d-block">Kinh nghiệm</small>
                  <span className="fw-semibold">{job.experience}</span>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h2 className="h5 fw-bold mb-3">Quyền lợi</h2>
              <ul className="text-muted mb-0">
                {job.benefits.map((benefit) => (
                  <li key={benefit} className="mb-2">
                    {benefit}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RecruitmentJobDetail;
