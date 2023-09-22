import { Link } from "react-router-dom";

import { getUser } from "src/services/apiAuth";
import styles from "./ProfileSidebar.module.css";

function ProfileSidebar() {
  const userInfo = getUser().user;

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <img
          src={`http://localhost:3000/public/users/${userInfo.photo}`}
          alt="pic"
        />
        <p>{userInfo.username && userInfo.username}</p>
      </div>
      <div className={styles.bottomContainer}>
        <ul>
          <li>
            <Link to="/profile/about">
              <i className="fa-solid fa-id-badge" />
              <span> About Me</span>
            </Link>
          </li>
          <li>
            <Link to="/profile/statis">
              <i className="fa-solid fa-chart-line" />
              <span>Statis</span>
            </Link>
          </li>
          <li>
            <Link to="/profile/friends">
              <i className="fa-solid fa-user-group" />
              <span>Friends</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileSidebar;
