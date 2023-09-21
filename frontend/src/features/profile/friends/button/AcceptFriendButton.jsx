import { useState } from "react";

import { useFriends } from "../../../../contexts/FriendsContext";
import { acceptFriend } from "../../../../services/apiFriend";

function AcceptFriendButton({ user }) {
  const { setUpdate } = useFriends();

  const [isHandling, setIsHandling] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      setIsHandling(true);
      setError("");
      await acceptFriend(user.recipient._id);
      setUpdate(`accept ${Date.now()}`);
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

  return <button onClick={handleClick}>Accept</button>;
}

export default AcceptFriendButton;
