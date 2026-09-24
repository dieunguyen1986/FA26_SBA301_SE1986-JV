import {
  BarChart,
  Bell,
  Briefcase,
  Building,
  Calendar3,
  ChatDots,
  Gear,
  Grid1x2,
  People,
  PersonVcard,
  Search,
} from 'react-bootstrap-icons'
import { NavLink } from 'react-router'

// const menuGroups = [
//   {
//     label: 'Tổng quan',
//     items: [
//       { label: 'Dashboard', to: '/admin', icon: Grid1x2, end: true },
//     ],
//   },
//   {
//     label: 'Tuyển dụng',
//     items: [
//       { label: 'Tin tuyển dụng', to: '/admin/jobs', icon: Briefcase },
//       { label: 'Ứng viên', to: '/admin/candidates', icon: People },
//       { label: 'Lịch phỏng vấn', to: '/admin/interviews', icon: Calendar3 },
//       { label: 'Kho hồ sơ', to: '/admin/talent-pool', icon: PersonVcard },
//     ],
//   },
//   {
//     label: 'Kết nối & báo cáo',
//     items: [
//       { label: 'Tin nhắn', to: '/admin/messages', icon: ChatDots, badge: 4 },
//       { label: 'Thông báo', to: '/admin/notifications', icon: Bell },
//       { label: 'Phân tích tuyển dụng', to: '/admin/analytics', icon: BarChart },
//     ],
//   },
// ]

const navLinkClass = ({ isActive }) => (
  `nav-link d-flex align-items-center gap-3 rounded-3 px-3 py-2 ${
    isActive ? 'active bg-primary text-white shadow-sm' : 'text-secondary'
  }`
)

const AdminSidebar = ({ onNavigate }) => {
  return (
    <aside className="d-flex flex-column min-vh-100 p-3">
      <div className="d-flex align-items-center gap-2 px-2 mb-4">
        <span className="d-flex align-items-center justify-content-center rounded-circle bg-light text-primary p-2">
          <Building size={18} />
        </span>
        <div>
          <div className="fw-semibold text-dark small">FPTU Hola</div>
          <small className="d-block text-muted">Tài khoản nhà tuyển dụng</small>
        </div>
      </div>

      <nav aria-label="Menu nhà tuyển dụng">
          <div key="overview" className="mb-4">
            <small className="d-block text-uppercase px-3 mb-2 fw-bold">
              TỔNG QUAN
            </small>
            <div className="d-grid gap-1">
              {/*{group.items.map(({ label, to, icon: Icon, end, badge }) => (*/}
                <NavLink
                  key="Dashboard"
                  to="/admin"
                  end={true}
                  onClick={onNavigate}
                  className={navLinkClass}
                >
                  {/*<Icon size={18} />*/}
                  <span className="flex-grow-1">Dashboard</span>
                  {/*{badge && <span className="badge rounded-pill bg-danger">{badge}</span>}*/}
                </NavLink>
              {/*))*/}
            </div>
          </div>

        {/*))}*/}

        <div key="recruiting" className="mb-4">
          <small className="d-block text-uppercase fw-semibold px-3 mb-2 fw-bold">
            TUYỂN DỤNG
          </small>
          <div className="d-grid gap-1">
            {/*{group.items.map(({ label, to, icon: Icon, end, badge }) => (*/}
            <NavLink
                key="Candidate"
                to="/admin/candidates"
                end={true}
                onClick={onNavigate}
                className={navLinkClass}
            >
              {/*<Icon size={18} />*/}
              <span className="flex-grow-1">Ứng viên</span>
              {/*{badge && <span className="badge rounded-pill bg-danger">{badge}</span>}*/}
            </NavLink>
            {/*))*/}
          </div>

          <div className="d-grid gap-1">
            {/*{group.items.map(({ label, to, icon: Icon, end, badge }) => (*/}
            <NavLink
                key="Job"
                to="/admin/jobs"
                end={true}
                onClick={onNavigate}
                className={navLinkClass}
            >
              {/*<Icon size={18} />*/}
              <span className="flex-grow-1">Tin tuyển dụng</span>
              {/*{badge && <span className="badge rounded-pill bg-danger">{badge}</span>}*/}
            </NavLink>
            {/*))*/}
          </div>
        </div>
      </nav>

      <div className="mt-auto">
        <NavLink to="/admin/settings" onClick={onNavigate} className={navLinkClass}>
          <Gear size={18} />
          <span>Cài đặt</span>
        </NavLink>
      </div>
    </aside>
  )
}

export default AdminSidebar
