import { useAuth } from "../Auth/useAuth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedClientRoute = () => {
  const { isClient } = useAuth();
  console.log(isClient);
  return isClient ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtectedClientRoute;
