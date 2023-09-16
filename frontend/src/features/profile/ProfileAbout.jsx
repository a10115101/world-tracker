import { useState } from "react";

import ProfileAboutModal from "./ProfileAboutModal";
import styles from "./ProfileAbout.module.css";

function ProfileAbout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdditionInfo, setIsAdditionInfo] = useState(false);
  const [isIntroduction, setIsIntroduction] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

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
            <h4>User Name: Patrick Wu</h4>
            <h4>Email Address: bear@mail.com</h4>
            <h4>Created At: 2023/09/16</h4>
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
          <h4>Gender: Male</h4>
          <h4>Birthday: 1995/09/10</h4>
          <h4>Language: Chinese</h4>
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
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Blanditiis, dolorem vitae sapiente eos sunt fugiat fugit nemo
            numquam voluptates a illo ratione dicta harum officiis repellat
            molestiae cum error aspernatur in repudiandae eaque sed adipisci
            beatae. Dignissimos, temporibus fugit vitae iure quidem id ratione
            corrupti, dolorum numquam odit, nisi tempora.
          </p>
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
          <p>Now is public</p>
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
        />
      )}
    </div>
  );
}

export default ProfileAbout;
