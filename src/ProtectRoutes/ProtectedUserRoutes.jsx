import { useAuth } from "../Auth/useAuth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedUserRoutes = () => {
  const { isUser } = useAuth();
  return isUser ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtectedUserRoutes;
