import { useEffect, useState } from "react";

import ProfileAboutModal from "./ProfileAboutModal";
import { formatDate } from "../../utilities/formatDate";
import { getUser } from "../../services/apiAuth";
import styles from "./ProfileAbout.module.css";
// import { getUserInfo } from "../../services/apiUser";

function ProfileAbout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdditionInfo, setIsAdditionInfo] = useState(false);
  const [isIntroduction, setIsIntroduction] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  const userInfo = getUser().user;
  // console.log(userInfo);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.topHeaderContainer}>
          <h2>Basic Information</h2>
          <i className="fa-regular fa-pen-to-square fa-lg" />
        </div>

        <div className={styles.topBodyContainer}>
          <div className={styles.topLeftBodyContainer}>
            <div>Avatar</div>
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
            onClick={() => {
              setIsModalOpen(true);
              setIsAdditionInfo(true);
            }}
          />
        </div>
        <div className={styles.centerPart1BodyContainer}>
          <h4>Gender: {userInfo.gender && userInfo.gender}</h4>
          <h4>
            Birthday: {userInfo.birthday && formatDate(userInfo.birthday)}
          </h4>
          <h4>Language: {userInfo.language && userInfo.language}</h4>
        </div>
      </div>

      <div className={styles.centerPart2Container}>
        <div className={styles.centerPart2HeaderContainer}>
          <h2>Introduction</h2>
          <i
            className="fa-regular fa-pen-to-square fa-lg"
            onClick={() => {
              setIsModalOpen(true);
              setIsIntroduction(true);
            }}
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
            onClick={() => {
              setIsModalOpen(true);
              setIsSetting(true);
            }}
          />
        </div>
        <div className={styles.bottomBodyContainer}>
          <p>
            {userInfo.isOpen && userInfo.isOpen
              ? "Everyone can see"
              : "Only you can see."}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <ProfileAboutModal
          closeModal={() => {
            setIsModalOpen(false);
            setIsAdditionInfo(false);
            setIsIntroduction(false);
            setIsSetting(false);
          }}
          isAdditionInfo={isAdditionInfo}
          isIntroduction={isIntroduction}
          isSetting={isSetting}
          userInfo={userInfo}
        />
      )}
    </div>
  );
}

export default ProfileAbout;
