import { useState } from "react";

import { acceptFriend } from "../../../services/apiFriend";
import { useFriends } from "../../../contexts/FriendsContext";

function AcceptFriendButton({ user }) {
  const { setUpdate } = useFriends();

  const [isPressed, setIsPressed] = useState(false);

  const handleClick = async () => {
    try {
      setIsPressed(true);
      await acceptFriend(user.recipient._id);
      setUpdate(`accept ${Date.now()}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (isPressed) return <p>handling...</p>;

  return (
    <button onClick={handleClick} disabled={isPressed && true}>
      {!isPressed ? "Accept" : "A"}
    </button>
  );
}

export default AcceptFriendButton;
