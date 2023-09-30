import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { signup } from "src/services/apiAuth";
import { backendPort } from "src/utilities/port";
import { options } from "src/utilities/snackbar";
import styles from "./Singup.module.css";

function Singup() {
  const navigate = useNavigate();

  const [username, setUserame] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await signup(username, email, password);
      enqueueSnackbar("Success Singup", options("success"));
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response.data.message;
      enqueueSnackbar(errorMessage, options("error"));
    }
  };

  const hanldeGoogleLogin = () => {
    window.location.href = backendPort("api/v1/auth/google");
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <h1>Create Your Account</h1>
        <div>
          <h2>Have an account?</h2>
          <Link to="/login">Login now</Link>
        </div>
      </div>

      <div className={styles.centerContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">
              <i className="fa-solid fa-user-plus" />
              Your Name
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUserame(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">
              <i className="fa-solid fa-envelope" />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">
              <i className="fa-solid fa-key" />
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button>Next</button>
          </div>
        </form>
      </div>

      <div className={styles.bottomContainer}>
        <h2>Or with google?</h2>
        <img
          src="https://img.icons8.com/color/30/google-logo.png"
          alt="google-logo"
        />
        <Link onClick={hanldeGoogleLogin}>Google Account</Link>
      </div>
    </div>
  );
}

export default Singup;
