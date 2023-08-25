import styles from "./ProfileAbout.module.css";

function ProfileAbout() {
  return (
    <main className={styles.container}>
      <h1>About me</h1>

      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <input id="country" type="text" />
        </div>

        <div>
          <label htmlFor="birthday">Birthday</label>
          <input id="birthday" type="text" />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" />
        </div>

        <div>
          <label htmlFor="introduction">Introduction</label>
          <textarea id="introduction" rows={6}></textarea>
        </div>

        <button>Save</button>
      </form>
    </main>
  );
}

export default ProfileAbout;
