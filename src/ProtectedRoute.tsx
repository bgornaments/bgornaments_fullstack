import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  if (!user) {
    // If the user is not authenticated, store the current route and redirect to login
    sessionStorage.setItem("redirectTo", window.location.pathname);
    navigate("/login");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
