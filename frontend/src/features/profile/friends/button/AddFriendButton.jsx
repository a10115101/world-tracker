import { useState } from "react";

import { useFriends } from "src/contexts/FriendsContext";
import { addFriend } from "src/services/apiFriend";
import styles from "./button.module.css";

function AddFriendButton({ user, children }) {
  const { setUpdate } = useFriends();

  const [isHandling, setIsHandling] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      setIsHandling(true);
      setError("");
      await addFriend(user._id);
      setUpdate(`add ${Date.now()}`);
      setIsValid(true);
    } catch (err) {
      setError("Failed to add operation");
    } finally {
      setIsHandling(false);
    }
  };

  if (error) return <h3>{error}</h3>;

  if (isHandling) return <h3>handling...</h3>;

  if (isValid) return <h3>Successfully sending!</h3>;

  return (
    <button className={`${styles.btn} ${styles.warning}`} onClick={handleClick}>
      {children} <i className="fa-solid fa-plus" />
    </button>
  );
}

export default AddFriendButton;
