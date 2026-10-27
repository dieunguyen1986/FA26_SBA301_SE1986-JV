import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthsContext } from "../provider/AuthsContext";
import { getRoleHomePath, normalizeRoles } from "./rolePaths";

const ProtectedRouter = ({ allowedRoles }) => {
  const { user } = useContext(AuthsContext);

  const location = useLocation();

  const token = user?.authToken || user?.token || null;
  const userRoles = normalizeRoles(user?.roles);

  // The backend stores the JWT in an HttpOnly cookie, so it is intentionally
  // not present in the login response or readable from JavaScript.
  const isAuthenticated =
    (typeof token === "string" && token.trim() !== "") ||
    userRoles.length > 0;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: "Please log in to access this page.",
        }}
        replace
      />
    );
  }

  if (allowedRoles?.length > 0) {
    const normalizedAllowedRoles = normalizeRoles(allowedRoles);
    const hasPermission = normalizedAllowedRoles.some((role) =>
      userRoles.includes(role),
    );

    if (!hasPermission) {
      return <Navigate to={getRoleHomePath(userRoles) || "/"} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRouter;
