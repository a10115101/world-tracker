import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { google } from "../services/apiAuth";
import { useAuth } from "../contexts/AuthContext";
import { options } from "../utilities/snackbar";

function Redirect() {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(function () {
    async function getData() {
      try {
        const response = await google();
        localStorage.setItem("user", JSON.stringify(response.data));
        setCurrentUser(response);
        enqueueSnackbar("Success Login", options("success"));
        navigate("/map");
      } catch (err) {
        console.log(err);
        const errorMessage = err.response.data.message;
        enqueueSnackbar(errorMessage, options("error"));
        navigate("/");
      }
    }

    getData();
  }, []);

  return <div>Redircting...</div>;
}

export default Redirect;
