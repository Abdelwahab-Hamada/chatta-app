import { useLocation, Navigate, Outlet, } from "react-router-dom";

const RequireAuth = () => {
    const isLogged=localStorage.getItem("logged") || false

    const location = useLocation();

    const content=(
        isLogged
        ? <Outlet />
        : <Navigate to="/chatta-app/login/" state={{ from: location }} replace />
    )
  return content
}

export default RequireAuth