import { useNavigate } from "react-router-dom";
import { closeSnackbar, enqueueSnackbar } from "notistack";

import { options } from "src/utilities/snackbar";
import { deleteRecord } from "src/services/apiRecord";
import styles from "./button.module.css";

function DeleteRecordButton({ id, children }) {
  const navigate = useNavigate();

  const handleDeleteConfirm = async (e) => {
    e.preventDefault();
    enqueueSnackbar("Are you sure?", {
      ...options("warning"),
      action: (key) => (
        <div>
          <button
            className={`${styles.smallBtn} ${styles.success}`}
            onClick={() => {
              handleDelete(e, id);
              closeSnackbar(key);
            }}
          >
            Yes
          </button>
          <button
            className={`${styles.smallBtn} ${styles.danger}`}
            onClick={() => closeSnackbar(key)}
          >
            No
          </button>
        </div>
      ),
    });
  };

  const handleDelete = async (e, id) => {
    try {
      e.preventDefault();
      await deleteRecord(id);
      enqueueSnackbar("Success Delete!", options("success"));
      navigate("/map");
    } catch (err) {
      const errorMessage = err.response.data.message;
      enqueueSnackbar(errorMessage, options("error"));
    }
  };

  return (
    <button
      className={`${styles.btn} ${styles.danger}`}
      onClick={handleDeleteConfirm}
    >
      {children}
      <i className="fa-regular fa-trash-can" />
    </button>
  );
}

export default DeleteRecordButton;
