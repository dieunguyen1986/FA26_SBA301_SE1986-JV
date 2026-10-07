import { useContext } from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Navbar,
} from "react-bootstrap";
import {
  Bell,
  Briefcase,
  List,
  PersonCircle,
  Search,
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router";
import { AuthsContext } from "../../app/provider/AuthsContext";

const AdminHeader = ({ onMenuClick }) => {
  const { user, logout } = useContext(AuthsContext);
  const navigate = useNavigate();
  const isAdmin = user?.roles?.includes("ADMIN");
  const basePath = isAdmin ? "/admin" : "/recruiter";
  const roleLabel = isAdmin ? "Admin" : "Recruiter";

  return (
    <Navbar
      expand="lg"
      className="sticky-top bg-white border-bottom shadow-sm py-2"
    >
      <Container fluid className="px-3 px-lg-4">
        <Button
          variant="light"
          className="d-lg-none border-0 me-2 p-2"
          onClick={onMenuClick}
          aria-label="Mở menu"
        >
          <List size={22} />
        </Button>

        <Navbar.Brand
          as={Link}
          to={basePath}
          className="d-flex align-items-center gap-2 me-lg-4"
        >
          <span className="d-flex align-items-center justify-content-center rounded-3 bg-primary text-white p-2">
            <Briefcase size={18} />
          </span>
          <span>
            <span className="d-block fw-bold text-dark lh-1">TalentHub</span>
            <small className="text-muted">{roleLabel} workspace</small>
          </span>
        </Navbar.Brand>

        <Form className="d-none d-md-flex flex-grow-1 mx-lg-4" role="search">
          <InputGroup>
            <InputGroup.Text className="bg-light border-end-0 text-muted">
              <Search size={17} />
            </InputGroup.Text>
            <Form.Control
              className="bg-light border-start-0"
              placeholder="Tìm ứng viên, tin tuyển dụng..."
              aria-label="Tìm kiếm"
            />
          </InputGroup>
        </Form>

        <div className="d-flex align-items-center gap-2 ms-auto">
          <Button
            variant="light"
            className="d-md-none border-0 p-2"
            aria-label="Tìm kiếm"
          >
            <Search size={19} />
          </Button>
          <Button
            variant="light"
            className="position-relative border-0 p-2"
            aria-label="Thông báo"
          >
            <Bell size={19} />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-white rounded-circle" />
          </Button>

          <Dropdown align="end">
            <Dropdown.Toggle
              variant="light"
              className="d-flex align-items-center gap-2 border-0 px-2"
            >
              <PersonCircle size={29} className="text-primary" />
              <span className="d-none d-xl-inline text-start">
                <span className="d-block fw-semibold text-dark small">
                  {user?.fullName}
                </span>
                <small className="d-block text-muted">{roleLabel}</small>
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>Tài khoản</Dropdown.Header>
              <Dropdown.Item as={Link} to={`${basePath}/settings`}>
                Cài đặt
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Đăng xuất
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;
