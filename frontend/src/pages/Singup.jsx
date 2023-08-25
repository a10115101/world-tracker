import { Link } from "react-router-dom";

import styles from "./Singup.module.css";

function Singup() {
  return (
    <main className={styles.login}>
      <form className={styles.form}>
        <div>
          <h1>Create Your Account</h1>
        </div>

        <div className={styles.rowSingup}>
          <h2>Have an account?</h2>
          <Link to="/login">Login now</Link>
        </div>

        <div className={styles.row}>
          <label htmlFor="name">
            <i className="fa-solid fa-user-plus" />
            Your Name
          </label>
          <input id="name" type="text" />
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
            <img
              src="https://img.icons8.com/color/30/google-logo.png"
              alt="google-logo"
            />
            <span>Google Account</span>
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Singup;
