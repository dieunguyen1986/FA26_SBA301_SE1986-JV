
import { Briefcase, Save } from "react-bootstrap-icons";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthsContext } from "../../../app/provider/AuthsContext";
import { jobApi } from "../api/job.api";
import { departmentApi } from "../api/department.api";

const RecruitmentJobEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthsContext);

  const basePath = user?.roles?.includes("ADMIN")
    ? "/admin"
    : "/recruiter";

  const job = {
    ...location.state?.job,
  };

  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    title: job.title,
    departmentId: job.departmentId,
    location: job.location,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    deadline: job.deadline ? job.deadline.toString().slice(0, 10) : "",
    description: job.description,
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await departmentApi.getAllDepartments();
        setDepartments(response.data ?? response);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedJob = {
      ...formData,
      salaryMin: Number(formData.salaryMin),
      salaryMax: Number(formData.salaryMax),
      deadline: formData.deadline
        ? `${formData.deadline}T23:59:59+07:00`
        : null,
    };

    if (updatedJob.salaryMin > updatedJob.salaryMax) {
      alert("Lương tối thiểu không được lớn hơn lương tối đa!");
      return;
    }

    try {
      await jobApi.updateJob(job.id, updatedJob);

      navigate(`${basePath}/jobs/${job.id}`);
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Cập nhật tin tuyển dụng thất bại!");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold text-dark mb-1">
          Sửa thông tin tin tuyển dụng
        </h1>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4 p-lg-5">
          <div className="d-flex align-items-center gap-3 mb-4">
            <span className="rounded-3 bg-light text-primary p-3">
              <Briefcase size={24} />
            </span>

            <div>
              <h2 className="h5 fw-bold mb-1">
                Thông tin tin tuyển dụng
              </h2>
              <p className="text-muted small mb-0">
                Điền các thông tin cơ bản của vị trí cần tuyển.
              </p>
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={8}>
                <Form.Group controlId="job-title">
                  <Form.Label className="fw-semibold">
                    Tiêu đề tin tuyển dụng
                  </Form.Label>
                  <Form.Control
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="job-department">
                  <Form.Label className="fw-semibold">
                    Phòng ban
                  </Form.Label>
                  <Form.Select
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Chọn phòng ban
                    </option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.departmentName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="job-location">
                  <Form.Label className="fw-semibold">
                    Địa điểm làm việc
                  </Form.Label>
                  <Form.Control
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="job-salary-min">
                  <Form.Label className="fw-semibold">
                    Lương tối thiểu
                  </Form.Label>
                  <Form.Control
                    name="salaryMin"
                    type="number"
                    min="0"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    placeholder="VNĐ"
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="job-salary-max">
                  <Form.Label className="fw-semibold">
                    Lương tối đa
                  </Form.Label>
                  <Form.Control
                    name="salaryMax"
                    type="number"
                    min="0"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    placeholder="VNĐ"
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="job-deadline">
                  <Form.Label className="fw-semibold">
                    Hạn ứng tuyển
                  </Form.Label>
                  <Form.Control
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group controlId="job-description">
                  <Form.Label className="fw-semibold">
                    Mô tả công việc
                  </Form.Label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-4 pt-4 border-top">
              <Button
                as={Link}
                to={`${basePath}/jobs/${job.id}`}
                variant="light"
              >
                Hủy
              </Button>

              <Button
                type="submit"
                variant="primary"
                className="d-flex align-items-center gap-2"
              >
                <Save size={16} />
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RecruitmentJobEdit;
