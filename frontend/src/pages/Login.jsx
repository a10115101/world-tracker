import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { useAuth } from "src/contexts/AuthContext";
import { login } from "src/services/apiAuth";
import { backendPort } from "src/utilities/port";
import { setLoacalStorage } from "src/utilities/localStorage";
import { options } from "src/utilities/snackbar";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLocalLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await login(email, password);
      setLoacalStorage(response.data);
      setCurrentUser(response);
      enqueueSnackbar("Success Login", options("success"));
      navigate("/map");
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
        <h1>Log Into Your Account</h1>
        <div>
          <h2>Do not have an account?</h2>
          <Link to="/signup">Sing Up</Link>
        </div>
      </div>

      <div className={styles.centerContainer}>
        <form className={styles.form} onSubmit={handleLocalLogin}>
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

export default Login;
