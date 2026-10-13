import { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Plus, Search, XCircle } from "react-bootstrap-icons";
import { Link } from "react-router";
import { AuthsContext } from "../../../app/provider/AuthsContext";
import { jobApi } from "../api/job.api";
import CustomPagination from "../../../shared/components/CustomPagination";
import { departmentApi } from "../api/department.api";

const monthOptions = Array.from({ length: 12 }, (_, index) => {
  const month = index + 1;

  return { value: String(month), label: `Tháng ${month}` };
});

const currentYear = new Date().getFullYear();
const yearOptions = [currentYear, currentYear - 1];

const formatRecruitmentMonth = (month) => {
  const [year, monthNumber] = month.split("-");
  return `Tháng ${monthNumber}/${year}`;
};

const RecruitmentJobList = () => {
  const { user } = useContext(AuthsContext);
  const jobsBasePath = user?.roles?.includes("ADMIN") ? "/admin" : "/recruiter";

  const [jobs, setJobs] = useState([]); // State to hold the list of jobs
  const [departments, setDepartments] = useState([]); // State to hold the list of departments

  const [currentPage, setCurrentPage] = useState(0); // State to hold the current page
  const [totalPages, setTotalPages] = useState(0); // State to hold the total number of pages

  const [searchParams, setSearchParams] = useState({
    title: "",
    departmentId: "",
    recruitmentMonth: "",
    recruitmentYear: "",
  });

  const handleSearch = async (event) => {
    event.preventDefault();

    console.log("Search parameters:", searchParams);

    await getJobsByPage({ index: 0, size: 10, filters: searchParams }); // Fetch jobs based on search parameters

    // setSearchParams({
    //   title: titleQuery.trim(),
    //   department,
    //   recruitmentMonth,
    //   recruitmentYear,
    // });
  };

  const getJobsByPage = async ({ index, size, filters = searchParams }) => {
    try {
      const response = await jobApi.getJobs({
        index,
        size,
        filters,
      }); // Fetch jobs from API with pagination parameters

      const data = await response.data;

      setJobs(data.content); // Update the state with the fetched jobs

      setTotalPages(data.totalPages); // Update the total number of pages
      setCurrentPage(data.number + 1); // Update the current page
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      getJobsByPage({ index: 0, size: 10 }); // Fetch the first page of jobs with a size of 2

      // List departments

      try {
        const response = await departmentApi.getAllDepartments();
        const data = await response.data;
        setDepartments(data); // Update the state with the fetched departments

      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchData();
  }, []); // Fetch jobs from API or other source and setJobs

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Fetch jobs for the selected page from API or other source and update the jobs state

    getJobsByPage({
      index: pageNumber - 1,
      size: 10,
      filters: searchParams,
    }); // Fetch jobs for the selected page
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
    setSearchParams({
      title: "",
      department: "",
      recruitmentMonth: "",
      recruitmentYear: "",
    });
  };

  return (
    <div>
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-3 p-md-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <div>
              <h2 className="fw-bold mb-1">Quản lý tin tức tuyển dụng</h2>
            </div>
          </div>
          <Form onSubmit={handleSearch}>
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
                      value={searchParams.title}
                      onChange={(event) =>
                        setSearchParams({
                          ...searchParams,
                          title: event.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={3} lg={2}>
                <Form.Group controlId="job-department-filter">
                  <Form.Label className="small fw-semibold text-secondary">
                    Phòng ban
                  </Form.Label>
                  <Form.Select
                    value={searchParams.departmentId}
                    onChange={(event) => {
                      setSearchParams({
                        ...searchParams,
                        departmentId: event.target.value,
                      });
                    }}
                  >
                    <option value="">Tất cả phòng ban</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.departmentName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4} lg={2}>
                <Form.Group controlId="job-month-filter">
                  <Form.Label className="small fw-semibold text-secondary">
                    Tháng
                  </Form.Label>
                  <Form.Select
                    value={searchParams.recruitmentMonth}
                    onChange={(event) =>
                      setSearchParams({
                        ...searchParams,
                        recruitmentMonth: event.target.value,
                      })
                    }
                  >
                    <option value="">Tất cả tháng</option>
                    {monthOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4} lg={2}>
                <Form.Group controlId="job-year-filter">
                  <Form.Label className="small fw-semibold text-secondary">
                    Năm
                  </Form.Label>
                  <Form.Select
                    value={searchParams.recruitmentYear}
                    onChange={(event) =>
                      setSearchParams({
                        ...searchParams,
                        recruitmentYear: event.target.value,
                      })
                    }
                  >
                    <option value="">Tất cả năm</option>
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12} lg={1}>
                <div className="d-flex flex-column gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 d-flex align-items-center justify-content-center gap-2"
                  >
                    <Search size={16} />
                    Tìm kiếm
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 pt-4 px-3 px-md-4">
          <div>
            {/*<h2 className="h6 fw-bold mb-1">Danh sách tin tuyển dụng</h2>*/}
          </div>
          <Button
            as={Link}
            to={`${jobsBasePath}/jobs/new`}
            variant="primary"
            className="d-flex align-items-center gap-1 align-self-start"
          >
            <Plus size={17} />
            Thêm mới
          </Button>
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
                    <div className="d-flex flex-column align-items-center gap-1">
                      <Button
                        as={Link}
                        to={`${jobsBasePath}/jobs/${job.id}`}
                        state={{ job }}
                        variant="link"
                        className="p-0 text-decoration-none"
                      >
                        Xem chi tiết
                      </Button>
                      <Button
                        type="button"
                        variant="link"
                        className="p-0 text-danger text-decoration-none d-flex align-items-center gap-1"
                        title="Đóng tin tuyển dụng"
                      >
                        <XCircle size={12} />
                        Đóng job
                      </Button>
                    </div>
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

export default RecruitmentJobList;
