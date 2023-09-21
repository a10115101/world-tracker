import { useState } from "react";

import Photo from "./modal/Photo";
import AdditionalInfo from "./modal/AdditionalInfo";
import Introduction from "./modal/Introduction";
import Setting from "./modal/Setting";

import { formatDate, formatLanguage } from "src/utilities/format";
import { getUser } from "src/services/apiAuth";
import styles from "./ProfileAbout.module.css";

function ProfileAbout() {
  const [isPhoto, setIsPhoto] = useState(false);
  const [isAdditionInfo, setIsAdditionInfo] = useState(false);
  const [isIntroduction, setIsIntroduction] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  const userInfo = getUser().user;

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
            src={`http://localhost:3000/public/users/${userInfo.photo}`}
            alt="photo"
          />
          <div>
            <p>User Name: {userInfo.username && userInfo.username}</p>
            <p>Email Address: {userInfo.email && userInfo.email}</p>
            <p>
              Created At: {userInfo.createdAt && formatDate(userInfo.createdAt)}
            </p>
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
          <p>Gender: {userInfo.gender && userInfo.gender}</p>
          <p>Birthday: {userInfo.birthday && formatDate(userInfo.birthday)}</p>
          <p>
            Language: {userInfo.language && formatLanguage(userInfo.language)}
          </p>
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
          <p>{userInfo.introduction && userInfo.introduction}</p>
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
          <p>
            {userInfo.isPublic && userInfo.isPublic
              ? "Now is public!"
              : "Only you can see!"}
          </p>
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
