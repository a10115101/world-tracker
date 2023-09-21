import { useState } from "react";

import { useFriends } from "../../../../contexts/FriendsContext";
import { cancelFriend } from "../../../../services/apiFriend";

function CancelFriendButton({ user }) {
  const { setUpdate } = useFriends();

  const [isHandling, setIsHandling] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      setIsHandling(true);
      setError("");
      await cancelFriend(user.recipient._id);
      setUpdate(`cancel ${Date.now()}`);
      setIsValid(true);
    } catch (err) {
      setError("Failed operation");
    } finally {
      setIsHandling(false);
    }
  };

  if (error) return <p>{error}</p>;

  if (isHandling) return <p>handling...</p>;

  if (isValid) return;

  return <button onClick={handleClick}>Cancel</button>;
}

export default CancelFriendButton;
