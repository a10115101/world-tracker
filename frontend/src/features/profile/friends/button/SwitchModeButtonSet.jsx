import styles from "./button.module.css";

function SwitchModeButtonSet({ mode, setMode, friends, pending }) {
  return (
    <div className={styles.container}>
      <button
        className={mode === "all" ? `${styles.btnFocus}` : ""}
        onClick={() => setMode("all")}
      >
        All ({friends.length})
      </button>
      <button
        className={mode === "pending" ? `${styles.btnFocus}` : ""}
        onClick={() => setMode("pending")}
      >
        Pending {pending.length > 0 && <span>+{pending.length}</span>}
      </button>
    </div>
  );
}

export default SwitchModeButtonSet;
