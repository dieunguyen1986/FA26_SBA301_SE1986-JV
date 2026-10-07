import { useContext } from "react";
import { Building } from "react-bootstrap-icons";
import { NavLink } from "react-router";
import { AuthsContext } from "../../app/provider/AuthsContext";
import { menuGroupsByRole } from "./adminSidebarMenu";

const navLinkClass = ({ isActive }) =>
  `nav-link d-flex align-items-center gap-3 rounded-3 px-3 py-2 ${
    isActive ? "active bg-primary text-white shadow-sm" : "text-secondary"
  }`;

const AdminSidebar = ({ onNavigate }) => {
  const { user } = useContext(AuthsContext);
  const isAdmin = user?.roles?.includes("ADMIN");
  const role = isAdmin ? "ADMIN" : "RECRUITER";
  const menuGroups = menuGroupsByRole[role];
  const roleLabel = isAdmin ? "Tài khoản quản trị" : "Tài khoản nhà tuyển dụng";

  return (
    <aside className="d-flex flex-column min-vh-100 p-3">
      <div className="d-flex align-items-center gap-2 px-2 mb-4">
        <span className="d-flex align-items-center justify-content-center rounded-circle bg-light text-primary p-2">
          <Building size={18} />
        </span>
        <div>
          <div className="fw-semibold text-dark small">FPTU Hola</div>
          <small className="d-block text-muted">{roleLabel}</small>
        </div>
      </div>

      <nav aria-label="Menu quản lý">
        {menuGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <small className="d-block text-uppercase px-3 mb-2 fw-bold">
              {group.label}
            </small>
            <div className="d-grid gap-1">
              {group.items.map(({ label, to, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={onNavigate}
                  className={navLinkClass}
                >
                  <Icon size={18} />
                  <span className="flex-grow-1">{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
