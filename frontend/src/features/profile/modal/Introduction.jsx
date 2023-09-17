import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { useAuth } from "../../../contexts/AuthContext";
import { updateUser } from "../../../services/apiUser";
import { options } from "../../../utilities/snackbar";
import { updateLocalStorage } from "../../../utilities/updateLoaclStorage";
import styles from "./Introduction.module.css";

function Introduction({ closeModal, userInfo }) {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [introduction, setIntroduction] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const updateMeObject = {
        introduction,
      };
      const newUpadte = await updateUser(userInfo._id, updateMeObject);
      updateLocalStorage(newUpadte);
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
            <label htmlFor="introduction">Introduction</label>
            <textarea
              id="introduction"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Introduction;
