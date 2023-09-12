import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!currentUser) navigate("/");
    },
    [currentUser, navigate]
  );

  return currentUser ? children : null;
}

export default ProtectedRoute;
