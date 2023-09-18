import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useAuth } from "../../../contexts/AuthContext";
import { updateUser } from "../../../services/apiUser";
import { options } from "../../../utilities/snackbar";
import { updateLocalStorage } from "../../../utilities/updateLoaclStorage";
import styles from "./modal.module.css";

function AdditionInfo({ closeModal, userInfo }) {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [birthday, setBirthdaye] = useState("");
  const [language, setLanguage] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const updateMeObject = {
        gender,
        birthday,
        language,
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
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="birthday">Birthday</label>
            <DatePicker
              id="birthday"
              onChange={(date) => setBirthdaye(date)}
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
