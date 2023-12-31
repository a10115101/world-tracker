import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { useAuth } from "src/contexts/AuthContext";
import { google } from "src/services/apiAuth";
import { setLoacalStorage } from "src/utilities/localStorage";
import { options } from "src/utilities/snackbar";
import styles from "./Redirect.module.css";

function Redirect() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  useEffect(function () {
    async function getData() {
      try {
        const response = await google();
        setLoacalStorage(response.data);
        setCurrentUser(response);
        enqueueSnackbar("Success Login", options("success"));
        navigate("/map");
      } catch (err) {
        const errorMessage = err.response.data.message;
        enqueueSnackbar(errorMessage, options("error"));
        navigate("/");
      }
    }
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Redircting...</h1>
    </div>
  );
}

export default Redirect;
