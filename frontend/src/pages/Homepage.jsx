import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { useAuth } from "src/contexts/AuthContext";
import { logout } from "src/services/apiAuth";
import { options } from "src/utilities/snackbar";
import { clearLocalStorage } from "src/utilities/localStorage";
import styles from "./Homepage.module.css";

function Homepage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();

  useEffect(function () {
    async function checkLoginState() {
      try {
        if (currentUser === null) return;

        if (currentUser?.user?.googleID) {
          clearLocalStorage();
          setCurrentUser(null);
          await logout();
          navigate("/");
        } else {
          navigate("/map");
        }
      } catch (err) {
        clearLocalStorage();
        setCurrentUser(null);
        await logout();
        enqueueSnackbar("Unknown Error, Please Re-Login!", options("error"));
        navigate("/");
      }
    }
    checkLoginState();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.leftTopContainer}>
          <img src="/logo.png" alt="logo" />
        </div>
        <div className={styles.leftBottomContainer}>
          <h1>Every wonderful journey is memorable!</h1>
          <p>
            You can record the visited travel or you are planning on the map.
            <br /> Start to create a variety of markers for you.
            <br /> And share it with your friends!
          </p>
          <Link to="/login">Start</Link>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <img src="/background.jpg" alt="background" />
      </div>
    </div>
  );
}

export default Homepage;
