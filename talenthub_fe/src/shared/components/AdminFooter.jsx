import { Heart, QuestionCircle } from 'react-bootstrap-icons'

const AdminFooter = () => {
  return (
    <footer className="bg-white border-top py-3 px-3 px-lg-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 text-muted small">
        <span>© 2026 TalentHub. Tối ưu quy trình tuyển dụng.</span>
        <span className="d-flex align-items-center gap-3">
          <a href="#help" className="text-muted text-decoration-none d-flex align-items-center gap-1">
            <QuestionCircle size={15} /> Trợ giúp
          </a>
          <span className="d-flex align-items-center gap-1">
            Made with <Heart size={13} className="text-danger" fill="currentColor" />
          </span>
        </span>
      </div>
    </footer>
  )
}

export default AdminFooter
