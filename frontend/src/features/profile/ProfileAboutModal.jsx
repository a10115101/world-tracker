import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./ProfileAboutModal.module.css";

function ProfileAboutModal({
  closeModal,
  isAdditionInfo,
  isIntroduction,
  isSetting,
}) {
  const [newdate, setNewDate] = useState(new Date());

  return (
    <div
      className={`${styles.outerContainer} modalOuterContainer`}
      onClick={(e) => {
        if (e.target.className.includes("modalOuterContainer")) closeModal();
      }}
    >
      <div className={styles.innerContainer}>
        <form>
          {isAdditionInfo && (
            <>
              <div className={styles.field}>
                <label htmlFor="gender">Gender</label>
                <select id="gender">
                  <option></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="birthday">Birthday</label>
                <DatePicker
                  id="birthday"
                  onChange={(date) => setNewDate(date)}
                  selected={newdate}
                  maxDate={new Date()}
                  dateFormat="MMM dd, yyyy"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="language">Language</label>
                <select id="language">
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
              <textarea id="introduction" />
            </div>
          )}

          {isSetting && (
            <div className={styles.field}>
              <label htmlFor="setting">Setting</label>
              <select id="setting">
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
