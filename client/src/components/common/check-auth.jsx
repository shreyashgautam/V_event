import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  // If not authenticated and trying to access anything except login/register
  if (
    !isAuthenticated &&
    !(path.includes("/login") || path.includes("/register"))
  ) {
    return <Navigate to="/auth/register" />;
  }

  // If authenticated and trying to access login/register again
  if (
    isAuthenticated &&
    (path.includes("/login") || path.includes("/register"))
  ) {
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;
    if (user?.role === "coordinator") return <Navigate to="/coordinator/home" />;
    if (user?.role === "student") return <Navigate to="/student/home" />;
  }

  // Prevent wrong role-based access
  if (isAuthenticated) {
    if (user?.role !== "admin" && path.includes("/admin")) {
      return <Navigate to="/unauth-page" />;
    }
    if (user?.role !== "coordinator" && path.includes("/coordinator")) {
      return <Navigate to="/unauth-page" />;
    }
    if (user?.role !== "student" && path.includes("/student")) {
      return <Navigate to="/unauth-page" />;
    }
  }

  return <>{children}</>;
}

export default CheckAuth;
