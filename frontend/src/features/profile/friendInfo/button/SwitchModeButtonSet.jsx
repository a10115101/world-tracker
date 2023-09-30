import styles from "./button.module.css";

function SwitchModeButtonSet({ mode, setMode }) {
  return (
    <div className={styles.container}>
      <button
        className={mode === "profile" ? `${styles.btnFocus}` : ""}
        onClick={() => setMode("profile")}
      >
        Profile
      </button>
      <button
        className={mode === "statis" ? `${styles.btnFocus}` : ""}
        onClick={() => setMode("statis")}
      >
        Statis
      </button>
    </div>
  );
}

export default SwitchModeButtonSet;
