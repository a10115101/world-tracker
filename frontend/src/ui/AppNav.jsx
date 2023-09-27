import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { useAuth } from "../contexts/AuthContext";
import { logout } from "../services/apiAuth";
import { options } from "../utilities/snackbar";
import styles from "./AppNav.module.css";

function AppNav() {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      setCurrentUser(null);
      navigate("/");
      enqueueSnackbar("Success Logout", options("success"));
    } catch (err) {
      const errorMessage = err.response.data.message;
      enqueueSnackbar(errorMessage, options("error"));
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <Link to={!currentUser ? "/" : "/map"}>World Tracker</Link>
      </div>
      <div className={styles.rightContainer}>
        <ul>
          {!currentUser && (
            <>
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
            </>
          )}
          {currentUser && (
            <>
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
                <Link to="/" onClick={handleClick}>
                  <i className="fa-solid fa-right-from-bracket" />
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AppNav;
