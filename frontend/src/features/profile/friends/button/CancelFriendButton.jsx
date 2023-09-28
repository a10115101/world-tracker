import { useState } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";

import { useFriends } from "src/contexts/FriendsContext";
import { cancelFriend } from "src/services/apiFriend";
import { options } from "src/utilities/snackbar";
import styles from "./button.module.css";

function CancelFriendButton({ user, handleMode, setHandleMode, children }) {
  const { setUpdate } = useFriends();

  const [isHandling, setIsHandling] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const handleCancelConfirm = async (e) => {
    e.preventDefault();
    enqueueSnackbar("Are you sure?", {
      ...options("warning"),
      action: (key) => (
        <div>
          <button
            className={`${styles.smallBtn} ${styles.success}`}
            onClick={() => {
              handleCancel(user, setHandleMode);
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

  const handleCancel = async (user, setHandleMode) => {
    try {
      setIsHandling(true);
      setError("");

      if (setHandleMode) setHandleMode("cancel");

      await cancelFriend(user.recipient._id);
      setUpdate(`cancel ${Date.now()}`);
      setIsValid(true);
    } catch (err) {
      setError("Failed to cancel operation");
    } finally {
      setIsHandling(false);
    }
  };

  if (error) return <h3>{error}</h3>;

  if (isHandling || handleMode === "cancel") return <h3>handling...</h3>;

  if (isValid) return;

  return (
    <button
      className={`${styles.btn} ${styles.danger}`}
      onClick={handleCancelConfirm}
    >
      {children}
      {user.status === 1 || user.status === 2 ? (
        <i className="fa-solid fa-xmark" />
      ) : (
        <i className="fa-regular fa-trash-can" />
      )}
    </button>
  );
}

export default CancelFriendButton;
