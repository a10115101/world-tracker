import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { logout } from "../services/apiAuth";
import { useAuth } from "../contexts/AuthContext";
import { options } from "../utilities/snackbar";
import styles from "./Homepage.module.css";

function Homepage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();

  useEffect(function () {
    async function checkLoginState() {
      try {
        if (currentUser === null) return;

        if (currentUser?.user?.googleID) {
          await logout();
          localStorage.removeItem("user");
          setCurrentUser(null);
          navigate("/");
        } else {
          navigate("/map");
        }
      } catch (err) {
        await logout();
        localStorage.removeItem("user");
        setCurrentUser(null);
        enqueueSnackbar("Unknown Error, Please Re-Login!", options("error"));
        navigate("/");
      }
    }

    checkLoginState();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <img src="/logo.png" alt="logo" style={{ maxWidth: "375px" }} />
        <h1>Every wonderful journey is memorable!</h1>
        <p>
          We can record the visited places on the map <br /> Create a unique
          mark for you on the map
          <br /> Share it with your friends
        </p>
        <Link to="/login">Start</Link>
      </div>

      <div className={styles.rightContainer}>
        <img
          src="/background.jpg"
          alt="background"
          style={{ maxWidth: "800px", borderRadius: "5px" }}
        />
      </div>
    </div>
  );
}

export default Homepage;
