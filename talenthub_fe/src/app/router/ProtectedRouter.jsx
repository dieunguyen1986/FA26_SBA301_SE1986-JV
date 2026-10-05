import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthsContext } from "../provider/AuthsContext";
const ProtectedRouter = ({ allowedRoles }) => {
  const { user } = useContext(AuthsContext);

  const location = useLocation();

  const token = user?.authToken || null;
  const userRoles = Array.isArray(user?.roles) ? user.roles : [];

  // Kiểm tra token có hợp lệ không
  const isAuthenticated =
      typeof token === "string" && token.trim() !== "";

  if (!isAuthenticated) {
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

  if (allowedRoles?.length > 0) {
    const hasPermission = allowedRoles.some((role) =>
        userRoles.includes(role),
    );

    if (!hasPermission) {
      return <Navigate to="/" replace />;
    }
  }


  // let isPermisson = false;
  // if (allowedRoles && allowedRoles.length > 0) {
  //   let userRole = null;
  //   try {
  //     if (userRoles) {
  //       isPermisson = allowedRoles.some((role) => {
  //         return userRoles.includes(role);
  //       });
  //     }
  //   } catch (e) {
  //     console.error("Error parsing authUser in ProtectedRoute:", e);
  //   }
  //
  //   if (!userRole || !isPermisson) {
  //     console.log("Permission: " + isPermisson + location.pathname);
  //
  //     return <Navigate to="/login" replace />;
  //   }
  // }

  return <Outlet />;
};

export default ProtectedRouter;
