import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthsContext } from "../provider/AuthsContext";
const ProtectedRouter = ({ allowedRoles }) => {
  const { user } = useContext(AuthsContext);

  const location = useLocation();

  const token = user?.authToken || null;
  const userRoles = user?.roles || null;

  // Kiểm tra token có hợp lệ không
  const isAuthenticated = Boolean(
    token && token !== "null" && token !== "undefined" && token.trim() !== "",
  );

  if (!isAuthenticated) {
    // Chặn người dùng chưa đăng nhập, lưu lại đường dẫn cũ để đăng nhập xong quay lại
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: "Vui lòng đăng nhập để truy cập trang Quản lý ứng viên.",
        }}
        replace
      />
    );
  }
  console.log(isAuthenticated);

  // Nếu có phân quyền theo role
  // allowedRoles = ["ADMIN", "RECRUITER"]
  // userRoles = ["ADMIN"]
  let isPermisson = false;
  if (allowedRoles && allowedRoles.length > 0) {
    let userRole = null;
    try {
      if (userRoles) {
        isPermisson = allowedRoles.some((role) => {
          return userRoles.includes(role);
        });
      }
    } catch (e) {
      console.error("Error parsing authUser in ProtectedRoute:", e);
    }

    if (!userRole || !isPermisson) {
      console.log("Permission: " + isPermisson + location.pathname);

      return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRouter;
