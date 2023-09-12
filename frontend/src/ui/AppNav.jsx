import { Link } from "react-router-dom";

import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <Link to="/">World Tracker</Link>
      </div>
      <div className={styles.rightContainer}>
        <ul>
          <li>
            <Link to="/login">
              <i className="fa-solid fa-right-to-bracket" />
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <i className="fa-solid fa-user-plus" />
              Signup
            </Link>
          </li>
          <li>
            <Link to="/map">
              <i className="fa-solid fa-map-location-dot" />
              Map
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <i className="fa-solid fa-user" />
              Profile
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="fa-solid fa-right-from-bracket" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AppNav;
