import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { updateRecord } from "src/services/apiRecord";
import { options } from "src/utilities/snackbar";
import styles from "./button.module.css";

function UpdateRecordButton({ id, updateRecordObject, children }) {
  const navigate = useNavigate();

  const handleModified = async (e) => {
    try {
      e.preventDefault();
      await updateRecord(id, updateRecordObject);
      enqueueSnackbar("Success Update!", options("success"));
      navigate("/map");
    } catch (err) {
      const errorMessage = err.response.data.message;
      enqueueSnackbar(errorMessage, options("error"));
    }
  };

  return (
    <button
      className={`${styles.btn} ${styles.success}`}
      onClick={handleModified}
    >
      {children}
      <i className="fa-solid fa-check" />
    </button>
  );
}

export default UpdateRecordButton;
