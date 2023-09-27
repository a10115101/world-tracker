import styles from "./button.module.css";

function SwitchModeButton({ setMode, mode, children }) {
  return (
    <button
      className={`${styles.btn}  
      ${mode === "update" && styles.warning} 
      ${mode === "normal" && styles.danger}`}
      onClick={(e) => {
        e.preventDefault();
        setMode(`${mode}`);
      }}
    >
      {children}
      {mode === "update" && <i className="fa-regular fa-pen-to-square" />}
      {mode === "normal" && <i className="fa-solid fa-xmark" />}
    </button>
  );
}

export default SwitchModeButton;
