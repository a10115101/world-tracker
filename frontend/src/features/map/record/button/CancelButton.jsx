import { useNavigate } from "react-router-dom";

import styles from "./button.module.css";

function CancelButton({ children }) {
  const navigate = useNavigate();

  return (
    <button
      className={`${styles.btn} ${styles.normal}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      {children}
      <i className="fa-solid fa-arrow-left-long" />
    </button>
  );
}

export default CancelButton;
