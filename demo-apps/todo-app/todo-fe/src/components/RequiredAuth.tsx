import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { RouteList } from "../shared/routeList.js";

const RequireAuth = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={RouteList.Login} state={{ from: location }} replace />
  );
};

export default RequireAuth;
