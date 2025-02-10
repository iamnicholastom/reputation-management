import { Navigate, useLocation } from "react-router";
import { useTypedSelector } from "../store/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, initialized } = useTypedSelector(
    (state) => state.auth
  );

  if (!initialized) {
    return null; // Or loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
