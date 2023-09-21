import { Link } from "react-router-dom";

import styles from "./ProfileSidebar.module.css";

function ProfileSidebar() {
  return (
    <div className={styles.container}>
      <ul>
        <div>人物頭像&名稱</div>
        <li>
          <Link to="/profile/about">
            <i className="fa-solid fa-id-badge" />
            About Me
          </Link>
        </li>
        <li>
          <Link to="/profile/statis">
            <i className="fa-solid fa-chart-line" />
            Statis
          </Link>
        </li>
        <li>
          <Link to="/profile/friends">
            <i className="fa-solid fa-user-group" />
            Friends
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ProfileSidebar;
