import { Link } from "react-router-dom";

import styles from "./Singup.module.css";

function Singup() {
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
        <form>
          <div>
            <label htmlFor="name">
              <i className="fa-solid fa-user-plus" />
              Your Name
            </label>
            <input id="name" type="text" />
          </div>
          <div>
            <label htmlFor="email">
              <i className="fa-solid fa-envelope" />
              Email Address
            </label>
            <input id="email" type="email" />
          </div>
          <div>
            <label htmlFor="password">
              <i className="fa-solid fa-key" />
              Password
            </label>
            <input id="password" type="password" />
          </div>
          <div>
            <button>Next</button>
            <span>Error Message Here!</span>
          </div>
        </form>
      </div>

      <div className={styles.bottomContainer}>
        <h2>Or with google?</h2>
        <Link>
          <img
            src="https://img.icons8.com/color/30/google-logo.png"
            alt="google-logo"
          />
          <span>Google Account</span>
        </Link>
      </div>
    </div>
  );
}

export default Singup;
