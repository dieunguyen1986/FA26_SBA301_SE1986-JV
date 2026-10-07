import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { ArrowCounterclockwise, Funnel, Search } from "react-bootstrap-icons";
import { Pencil } from "react-bootstrap-icons";
import { jobApi } from "../api/job.api";
import CustomPagination from "../../../shared/components/CustomPagination";

const sampleJobs = [
  {
    id: 1,
    title: "Senior Java Developer",
    department: "Engineering",
    recruitmentMonth: "2026-10",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    recruitmentMonth: "2026-10",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "Engineering",
    recruitmentMonth: "2026-09",
  },
  {
    id: 4,
    title: "Product Manager",
    department: "Product",
    recruitmentMonth: "2026-08",
  },
  {
    id: 5,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    recruitmentMonth: "2026-08",
  },
];

const departments = [...new Set(sampleJobs.map((job) => job.department))];

const monthOptions = [
  { value: "2026-10", label: "Tháng 10/2026" },
  { value: "2026-09", label: "Tháng 09/2026" },
  { value: "2026-08", label: "Tháng 08/2026" },
];

const formatRecruitmentMonth = (month) => {
  const [year, monthNumber] = month.split("-");
  return `Tháng ${monthNumber}/${year}`;
};

const JobList = () => {
  const [titleQuery, setTitleQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [recruitmentMonth, setRecruitmentMonth] = useState("");
  const [jobs, setJobs] = useState([]); // State to hold the list of jobs
  const [currentPage, setCurrentPage] = useState(0); // State to hold the current page
  const [totalPages, setTotalPages] = useState(0); // State to hold the total number of pages

  const getJobsByPage = async ({ index, size }) => {
    try {
      // Simulate API call
      const response = await jobApi.getJobs({ index, size }); // Fetch jobs from API with pagination parameters

      const data = await response.data;

      setJobs(data.content); // Update the state with the fetched jobs

      setTotalPages(data.totalPages); // Update the total number of pages
      setCurrentPage(data.number + 1); // Update the current page
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  useEffect(() => {
    const fetchJobs = async () => {
      getJobsByPage({ index: 0, size: 2 }); // Fetch the first page of jobs with a size of 2
    };

    fetchJobs();
  }, []); // Fetch jobs from API or other source and setJobs

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Fetch jobs for the selected page from API or other source and update the jobs state

    getJobsByPage({ index: pageNumber - 1, size: 2 }); // Fetch jobs for the selected page
  };

  // const filteredJobs = useMemo(() => {
  //   const normalizedTitleQuery = titleQuery.trim().toLowerCase()

  //   return sampleJobs.filter((job) => {
  //     const matchesTitle = job.title.toLowerCase().includes(normalizedTitleQuery)
  //     const matchesDepartment = !department || job.department === department
  //     const matchesMonth = !recruitmentMonth || job.recruitmentMonth === recruitmentMonth

  //     return matchesTitle && matchesDepartment && matchesMonth
  //   })
  // }, [department, recruitmentMonth, titleQuery])

  const resetFilters = () => {
    setTitleQuery("");
    setDepartment("");
    setRecruitmentMonth("");
  };

  return (
    <div>
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-3 p-md-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="rounded-3 bg-light text-primary p-2">
              <Funnel size={18} />
            </span>
            <div>
              <h2 className="h5 fw-bold mb-1">Tìm kiếm tin tuyển dụng</h2>
              <p className="text-muted small mb-0">
                Lọc danh sách theo tiêu đề, phòng ban hoặc tháng tuyển dụng.
              </p>
            </div>
          </div>

          <Form>
            <Row className="g-3 align-items-end">
              <Col md={5} lg={5}>
                <Form.Group controlId="job-title-search">
                  <Form.Label className="small fw-semibold text-secondary">
                    Tiêu đề tin tuyển dụng
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-white text-muted">
                      <Search size={16} />
                    </InputGroup.Text>
                    <Form.Control
                      type="search"
                      placeholder="Nhập tiêu đề cần tìm..."
                      value={titleQuery}
                      onChange={(event) => setTitleQuery(event.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={3} lg={3}>
                <Form.Group controlId="job-department-filter">
                  <Form.Label className="small fw-semibold text-secondary">
                    Phòng ban
                  </Form.Label>
                  <Form.Select
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                  >
                    <option value="">Tất cả phòng ban</option>
                    {departments.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4} lg={3}>
                <Form.Group controlId="job-month-filter">
                  <Form.Label className="small fw-semibold text-secondary">
                    Tháng tuyển dụng
                  </Form.Label>
                  <Form.Select
                    value={recruitmentMonth}
                    onChange={(event) =>
                      setRecruitmentMonth(event.target.value)
                    }
                  >
                    <option value="">Tất cả các tháng</option>
                    {monthOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12} lg={1}>
                <Button
                  type="button"
                  variant="light"
                  className="w-100 text-primary border d-flex align-items-center justify-content-center gap-2"
                  onClick={resetFilters}
                  title="Xóa bộ lọc"
                >
                  <ArrowCounterclockwise size={16} />
                  <span className="d-lg-none">Đặt lại</span>
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 pt-4 px-3 px-md-4">
          <div>
            <h2 className="h5 fw-bold mb-1">Danh sách tin tuyển dụng</h2>
            <p className="text-muted small mb-0">
              Hiển thị {jobs.length} tin tuyển dụng
            </p>
          </div>
        </Card.Header>
        <Card.Body className="px-0 px-md-2 pb-2">
          <Table responsive hover className="align-middle mb-0">
            <thead>
              <tr className="text-muted small">
                <th className="fw-normal border-0 ps-3 ps-md-4">#</th>
                <th className="fw-normal border-0">Tiêu đề</th>
                <th className="fw-normal border-0">Phòng ban</th>
                <th className="fw-normal border-0">Nơi làm việc</th>
                <th className="fw-normal border-0">Mức lương tối thiểu</th>
                <th className="fw-normal border-0">Mức lương tối đa</th>
                <th className="fw-normal border-0">Trang thái</th>
                <th className="fw-normal border-0 pe-3 pe-md-4">Deadline</th>
                <th className="fw-normal border-0 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job.id}>
                  <td className="text-muted ps-3 ps-md-4">{index + 1}</td>
                  <td className="fw-semibold text-dark">{job.title}</td>
                  <td className="text-muted">{job.departmentName}</td>
                  <td className="text-muted">{job.location}</td>
                  <td className="text-muted">
                    {job.salaryMin?.toLocaleString()} VND
                  </td>
                  <td className="text-muted">
                    {job.salaryMax?.toLocaleString()} VND
                  </td>
                  <td className="text-muted">{job.status}</td>
                  <td className="text-muted pe-3 pe-md-4">
                    {formatRecruitmentMonth(job.deadline)}
                  </td>
                  <td className="text-center">
                    <Button variant="link" className="p-0 text-decoration-none">
                      Xem chi tiết
                    </Button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-5">
                    Không tìm thấy tin tuyển dụng phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center mt-3">
            <CustomPagination
              active={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobList;
