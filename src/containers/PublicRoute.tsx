import { Navigate } from "react-router";
import { useAuth } from "../store/hooks";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Redirect to reviews page if already authenticated
    return <Navigate to="/reviews" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
