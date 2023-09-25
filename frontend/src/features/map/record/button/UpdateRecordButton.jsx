import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { updateRecord } from "src/services/apiRecord";
import { options } from "src/utilities/snackbar";

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

  return <button onClick={handleModified}>{children}</button>;
}

export default UpdateRecordButton;
