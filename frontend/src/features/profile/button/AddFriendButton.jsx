import { useState } from "react";

import { addFriend } from "../../../services/apiFriend";
import { useFriends } from "../../../contexts/FriendsContext";

function AddFriendButton({ user }) {
  const { setUpdate } = useFriends();
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = async () => {
    try {
      setIsPressed(true);
      await addFriend(user._id);
      setUpdate(`add ${Date.now()}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (isPressed) return <p>handling...</p>;

  return (
    <button onClick={handleClick} disabled={isPressed && true}>
      {!isPressed ? "Add" : "Requesting"}
    </button>
  );
}

export default AddFriendButton;
