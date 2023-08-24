import { Link } from "react-router-dom";

import styles from "./Login.module.css";

function Login() {
  return (
    <main className={styles.login}>
      <form className={styles.form}>
        <div>
          <h1>Log Into Your Account</h1>
        </div>

        <div className={styles.rowSingup}>
          <h2>Do not have an account?</h2>
          <Link to="/signup">Sing Up</Link>
        </div>

        <div className={styles.row}>
          <label htmlFor="email">
            <i className="fa-solid fa-envelope" />
            Email Address
          </label>
          <input id="email" type="email" />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">
            <i className="fa-solid fa-key" />
            Password
          </label>
          <input id="password" type="password" />
        </div>

        <button className={styles.btn}>Next</button>

        <div className={styles.rowDivision}>
          <h2>Or with google?</h2>
        </div>

        <div className={styles.rowLink}>
          <Link>
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" />
            <span>Google Account</span>
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Login;
