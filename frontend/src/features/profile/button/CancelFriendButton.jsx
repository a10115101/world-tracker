import { useState } from "react";

import { cancelFriend } from "../../../services/apiFriend";
import { useFriends } from "../../../contexts/FriendsContext";

function CancelFriendButton({ user }) {
  const { setUpdate } = useFriends();
  const [isPressed, setIsPressed] = useState(false);
  const [isHandling, setIsHandling] = useState(false);

  const handleClick = async () => {
    try {
      setIsPressed(true);
      setIsHandling(true);
      await cancelFriend(user.recipient._id);
      setUpdate(`cancel ${Date.now()}`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsHandling(false);
    }
  };

  if (isHandling) return <p>handling...</p>;

  return (
    <button onClick={handleClick} disabled={isPressed && true}>
      Cancel
    </button>
  );
}

export default CancelFriendButton;
