import { Link } from "react-router-dom";

import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <main className={styles.homepage}>
      <section>
        <img src="/logo.png" alt="logo" style={{ maxWidth: "375px" }} />
        <h1>Every wonderful journey is memorable!</h1>
        <p>
          We can record the visited places on the map <br /> Create a unique
          mark for you on the map
          <br /> Share it with your friends
        </p>
        <Link to="/login">Start</Link>
      </section>

      <section>
        <img
          src="/background.jpg"
          alt="background"
          style={{ maxWidth: "800px" }}
        />
      </section>
    </main>
  );
}

export default Homepage;
