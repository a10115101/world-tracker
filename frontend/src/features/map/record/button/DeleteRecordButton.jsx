import { useNavigate } from "react-router-dom";
import { closeSnackbar, enqueueSnackbar } from "notistack";

import { options } from "src/utilities/snackbar";
import { deleteRecord } from "src/services/apiRecord";

function DeleteRecordButton({ id, children }) {
  const navigate = useNavigate();

  const handleDeleteConfirm = async (e) => {
    e.preventDefault();
    enqueueSnackbar("Are you sure?", {
      ...options("warning"),
      action: (key) => (
        <div>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => closeSnackbar(key)}>No</button>
        </div>
      ),
    });
  };

  const handleDelete = async (e) => {
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

  return <button onClick={handleDeleteConfirm}>{children}</button>;
}

export default DeleteRecordButton;
