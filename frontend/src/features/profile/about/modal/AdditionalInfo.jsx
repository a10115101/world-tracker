import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import DatePicker from "react-datepicker";

import { useAuth } from "src/contexts/AuthContext";
import { updateUser } from "src/services/apiUser";
import { options } from "src/utilities/snackbar";
import { updateLocalStorage } from "src/utilities/updateLoaclStorage";
import styles from "./modal.module.css";

function AdditionInfo({ closeModal, userInfo }) {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const [gender, setGender] = useState(userInfo?.gender);
  const [birthday, setBirthday] = useState(
    userInfo?.birthday ? new Date(userInfo?.birthday) : ""
  );
  const [language, setLanguage] = useState(userInfo?.language);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const updateMeObject = { gender, birthday, language };
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
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="birthday">Birthday</label>
            <DatePicker
              id="birthday"
              onChange={(date) => setBirthday(date ? date : "")}
              selected={birthday}
              maxDate={new Date()}
              dateFormat="MMM dd, yyyy"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="language">Language</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option></option>
              <option value="zh">Chinese</option>
              <option value="en">English</option>
            </select>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AdditionInfo;
