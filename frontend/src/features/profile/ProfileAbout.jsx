import { useState } from "react";

import Photo from "./modal/Photo";
import AdditionalInfo from "./modal/AdditionalInfo";
import Introduction from "./modal/Introduction";
import Setting from "./modal/Setting";

import { formatDate, formatLanguage } from "../../utilities/format";
import { getUser } from "../../services/apiAuth";
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
        <div className={styles.topHeaderContainer}>
          <h2>Basic Information</h2>
          <i
            className="fa-regular fa-pen-to-square fa-lg"
            onClick={() => setIsPhoto(true)}
          />
        </div>

        <div className={styles.topBodyContainer}>
          <div className={styles.topLeftBodyContainer}>
            <div>
              <img
                src={`http://localhost:3000/public/users/${userInfo.photo}`}
                alt="pic"
                width="80"
              />
            </div>
          </div>
          <div className={styles.topRightBodyContainer}>
            <h4>User Name: {userInfo.username && userInfo.username}</h4>
            <h4>Email Address: {userInfo.email && userInfo.email}</h4>
            <h4>
              Created At: {userInfo.createdAt && formatDate(userInfo.createdAt)}
            </h4>
          </div>
        </div>
      </div>

      <div className={styles.centerPart1Container}>
        <div className={styles.centerPart1HeaderContainer}>
          <h2>Additional Information</h2>
          <i
            className="fa-regular fa-pen-to-square fa-lg"
            onClick={() => setIsAdditionInfo(true)}
          />
        </div>
        <div className={styles.centerPart1BodyContainer}>
          <h4>Gender: {userInfo.gender && userInfo.gender}</h4>
          <h4>
            Birthday: {userInfo.birthday && formatDate(userInfo.birthday)}
          </h4>
          <h4>
            Language: {userInfo.language && formatLanguage(userInfo.language)}
          </h4>
        </div>
      </div>

      <div className={styles.centerPart2Container}>
        <div className={styles.centerPart2HeaderContainer}>
          <h2>Introduction</h2>
          <i
            className="fa-regular fa-pen-to-square fa-lg"
            onClick={() => setIsIntroduction(true)}
          />
        </div>
        <div className={styles.centerPart2BodyContainer}>
          <p>{userInfo.introduction && userInfo.introduction}</p>
        </div>
      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.bottomHeaderContainer}>
          <h2>Privacy Setting</h2>
          <i
            className="fa-regular fa-pen-to-square fa-lg"
            onClick={() => setIsSetting(true)}
          />
        </div>
        <div className={styles.bottomBodyContainer}>
          <p>
            {userInfo.isPublic && userInfo.isPublic
              ? "Everyone can see"
              : "Only you can see."}
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
