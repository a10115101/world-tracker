import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { useAuth } from "../../../contexts/AuthContext";
import { updateUser } from "../../../services/apiUser";
import { options } from "../../../utilities/snackbar";
import styles from "./Setting.module.css";

function Setting({ closeModal, userInfo }) {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [setting, setSetting] = useState("public");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const updateMeObject = {
        setting,
      };
      const newUpadte = await updateUser(userInfo._id, updateMeObject);

      let newData = {};
      const oldData = JSON.parse(localStorage.getItem("user"));
      newData = { ...oldData };
      newData.user = { ...newUpadte.data.data.update };
      localStorage.setItem("user", JSON.stringify(newData));
      setCurrentUser(newUpadte);
      closeModal();
      navigate("/profile");
      enqueueSnackbar("Success Update!", options("success"));
    } catch (err) {
      const errorMessage = err.response.data.message;
      enqueueSnackbar(errorMessage, options("error"));
    }
  };

  return (
    <div
      className={`${styles.outerContainer} modalOuterContainer`}
      onClick={(e) => {
        if (e.target.className.includes("modalOuterContainer")) closeModal();
      }}
    >
      <div className={styles.innerContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="setting">Setting</label>
            <select
              id="setting"
              value={setting}
              onChange={(e) => setSetting(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="privacy">Privacy</option>
            </select>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Setting;
