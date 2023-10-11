import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { useAuth } from "src/contexts/AuthContext";
import { updateUser } from "src/services/apiUser";
import { options } from "src/utilities/snackbar";
import { updateLocalStorage } from "src/utilities/localStorage";
import styles from "./modal.module.css";

function Introduction({ closeModal, userInfo }) {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const [introduction, setIntroduction] = useState(userInfo?.introduction);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const updateMeObject = { introduction };
      const newUpadte = await updateUser(userInfo?._id, updateMeObject);

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
          <button className={styles.btn}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Introduction;
