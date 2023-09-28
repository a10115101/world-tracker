import { useState } from "react";

import { useFriends } from "src/contexts/FriendsContext";
import { acceptFriend } from "src/services/apiFriend";
import styles from "./button.module.css";

function AcceptFriendButton({ user, handleMode, setHandleMode, children }) {
  const { setUpdate } = useFriends();

  const [isHandling, setIsHandling] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      setIsHandling(true);
      setError("");
      setHandleMode("accept");
      await acceptFriend(user.recipient._id);
      setUpdate(`accept ${Date.now()}`);
      setIsValid(true);
    } catch (err) {
      setError("Failed to accept operation");
    } finally {
      setIsHandling(false);
    }
  };

  if (error) return <h3>{error}</h3>;

  if (isHandling || handleMode === "accept") return <h3>handling...</h3>;

  if (isValid) return;

  return (
    <button className={`${styles.btn} ${styles.success}`} onClick={handleClick}>
      {children}
      <i className="fa-solid fa-check" />
    </button>
  );
}

export default AcceptFriendButton;
