import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "src/contexts/AuthContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) navigate("/");
  }, [currentUser]);

  return currentUser ? children : null;
}

export default ProtectedRoute;
