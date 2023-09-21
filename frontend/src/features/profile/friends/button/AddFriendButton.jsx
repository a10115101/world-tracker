import { useState } from "react";

import { useFriends } from "../../../../contexts/FriendsContext";
import { addFriend } from "../../../../services/apiFriend";

function AddFriendButton({ user }) {
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
      setError("Failed operation");
    } finally {
      setIsHandling(false);
    }
  };

  if (error) return <p>{error}</p>;

  if (isHandling) return <p>handling...</p>;

  if (isValid) return;

  return <button onClick={handleClick}>Add</button>;
}

export default AddFriendButton;
