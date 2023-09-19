import { useParams } from "react-router-dom";

function ProfileFriendsData() {
  const { id } = useParams();

  return <div>{id}</div>;
}

export default ProfileFriendsData;
