import { Link } from "react-router-dom";

import styles from "./ProfileSidebar.module.css";

function ProfileSidebar() {
  return (
    <section className={styles.container}>
      <ul>
        <div>人物頭像&名稱</div>
        <li>
          <Link to="/profile/about">
            <i className="fa-solid fa-id-badge" />
            About Me
          </Link>
        </li>
        <li>
          <Link to="/profile/details">
            <i className="fa-solid fa-suitcase" />
            Records
          </Link>
        </li>
        <li>
          <Link to="/profile/friends">
            <i className="fa-solid fa-user-group" />
            Friends
          </Link>
        </li>
        <li>
          <Link to="/profile/setting">
            <i className="fa-solid fa-gear" />
            Settings
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default ProfileSidebar;
