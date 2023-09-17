import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./ProfileAboutModal.module.css";
import { updateUser } from "../../services/apiUser";
import { enqueueSnackbar } from "notistack";
import { options } from "../../utilities/snackbar";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProfileAboutModal({
  closeModal,
  isAdditionInfo,
  isIntroduction,
  isSetting,
  userInfo,
}) {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [birthday, setBirthdaye] = useState("");
  const [language, setLanguage] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [setting, setSetting] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const updateMeObject = {
        gender,
        birthday,
        language,
        introduction,
        // setting,
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
          {isAdditionInfo && (
            <>
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
            </>
          )}

          {isIntroduction && (
            <div className={styles.field}>
              <label htmlFor="introduction">Introduction</label>
              <textarea
                id="introduction"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
              />
            </div>
          )}

          {isSetting && (
            <div className={styles.field}>
              <label htmlFor="setting">Setting</label>
              <select
                id="setting"
                value={setting}
                onChange={(e) => setSetting(e.target.value)}
              >
                <option></option>
                <option value="public">Public</option>
                <option value="privacy">Privacy</option>
              </select>
            </div>
          )}

          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileAboutModal;
