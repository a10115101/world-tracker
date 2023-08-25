import { Link, NavLink } from "react-router-dom";

import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={styles.header}>
      <Link to="/">World Tracker</Link>
      <ul>
        <li>
          <NavLink to="/login">
            <i className="fa-solid fa-right-to-bracket" />
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup">
            <i className="fa-solid fa-user-plus" />
            Signup
          </NavLink>
        </li>
        <li>
          <NavLink to="/map">
            <i className="fa-solid fa-map-location-dot" />
            Map
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">
            <i className="fa-solid fa-user" />
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <i className="fa-solid fa-right-from-bracket" />
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
