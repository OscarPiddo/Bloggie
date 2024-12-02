import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { authToken } = useContext(UserContext);

  if (!authToken) {
    return <Navigate to="/" state={{ message: "Please log in to continue." }} />;
  }

  return children;
};

export default ProtectedRoute;
