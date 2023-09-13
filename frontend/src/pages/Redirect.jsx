import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { google } from "../services/apiAuth";
import { useAuth } from "../contexts/AuthContext";

function Redirect() {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(function () {
    async function getData() {
      try {
        const response = await google();
        localStorage.setItem("user", JSON.stringify(response.data));
        setCurrentUser(response);
        enqueueSnackbar("Success Login", {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        });
        navigate("/map");
      } catch (err) {
        const errorMessage = err.response.data.message;
        enqueueSnackbar(errorMessage, {
          variant: "error",
          preventDuplicate: true,
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        });
        navigate("/");
      }
    }

    getData();
  }, []);

  return <div>Redircting...</div>;
}

export default Redirect;
