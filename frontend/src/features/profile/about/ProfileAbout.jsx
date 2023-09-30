import { useState } from "react";

import Photo from "./modal/Photo";
import AdditionalInfo from "./modal/AdditionalInfo";
import Introduction from "./modal/Introduction";
import Setting from "./modal/Setting";
import { getCurrentUser } from "src/utilities/localStorage";
import { formatDate, formatLanguage } from "src/utilities/format";
import { backendPort } from "src/utilities/port";
import styles from "./ProfileAbout.module.css";

function ProfileAbout() {
  const [isPhoto, setIsPhoto] = useState(false);
  const [isAdditionInfo, setIsAdditionInfo] = useState(false);
  const [isIntroduction, setIsIntroduction] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  const userInfo = getCurrentUser().user;

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.headerContainer}>
          <h2>Basic Information</h2>
          <i
            className="fa-regular fa-pen-to-square fa-lg"
            onClick={() => setIsPhoto(true)}
          />
        </div>
        <div className={styles.topBodyContainer}>
          <img
            src={backendPort(`public/users/${userInfo?.photo}`)}
            alt="photo"
          />
          <div>
            <p>User Name: {userInfo?.username}</p>
            <p>Email Address: {userInfo?.email}</p>
            <p>Created At: {formatDate(userInfo?.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className={styles.centerContainer}>
        <div className={styles.headerContainer}>
          <h2>Additional Information</h2>
          <i
            className="fa-regular fa-pen-to-square fa-lg"
            onClick={() => setIsAdditionInfo(true)}
          />
        </div>
        <div className={styles.bodyContainer}>
          <p>Gender: {userInfo?.gender}</p>
          <p>Birthday: {formatDate(userInfo?.birthday)}</p>
          <p>Language: {formatLanguage(userInfo?.language)}</p>
        </div>
      </div>

      <div className={styles.centerContainer}>
        <div className={styles.headerContainer}>
          <h2>Introduction</h2>
          <i
            className="fa-regular fa-pen-to-square fa-lg"
            onClick={() => setIsIntroduction(true)}
          />
        </div>
        <div className={styles.bodyContainer}>
          <p>{userInfo?.introduction}</p>
        </div>
      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.headerContainer}>
          <h2>Privacy Setting</h2>
          <i
            className="fa-regular fa-pen-to-square fa-lg"
            onClick={() => setIsSetting(true)}
          />
        </div>
        <div className={styles.bodyContainer}>
          <p>{userInfo?.isPublic ? "Now is public!" : "Only you can see!"}</p>
        </div>
      </div>

      {isPhoto && (
        <Photo closeModal={() => setIsPhoto(false)} userInfo={userInfo} />
      )}

      {isAdditionInfo && (
        <AdditionalInfo
          closeModal={() => setIsAdditionInfo(false)}
          userInfo={userInfo}
        />
      )}

      {isIntroduction && (
        <Introduction
          closeModal={() => setIsIntroduction(false)}
          userInfo={userInfo}
        />
      )}

      {isSetting && (
        <Setting closeModal={() => setIsSetting(false)} userInfo={userInfo} />
      )}
    </div>
  );
}

export default ProfileAbout;
