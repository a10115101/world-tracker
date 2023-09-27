import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { creataRecord } from "src/services/apiRecord";
import { options } from "src/utilities/snackbar";
import styles from "./button.module.css";

function AddRecordButton({ recordObject, children }) {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      await creataRecord(recordObject);
      enqueueSnackbar("Success Creation!", options("success"));
      navigate("/map");
    } catch (err) {
      const errorMessage = err.response.data.message;
      enqueueSnackbar(errorMessage, options("error"));
    }
  };

  return (
    <button className={`${styles.btn} ${styles.success}`} onClick={handleClick}>
      {children}
      <i className="fa-solid fa-check" />
    </button>
  );
}

export default AddRecordButton;
