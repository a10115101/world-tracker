import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { creataRecord } from "src/services/apiRecord";
import { options } from "src/utilities/snackbar";

function AddRecordButton({ recordObject }) {
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

  return <button onClick={handleClick}>Add</button>;
}

export default AddRecordButton;
