import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/apiUser";

function ProfileFriendsData() {
  const { id } = useParams();

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [loadingError, setLoadingError] = useState("");

  useEffect(function () {
    async function getUserData() {
      try {
        setIsLoadingData(true);
        setLoadingError("");
        const data = await getUser(id);
        console.log(data);
      } catch (err) {
        console.log(err);
        setLoadingError("Loading Data Error!");
      } finally {
        setIsLoadingData(false);
      }
    }
    getUserData();
  }, []);

  return <div>{id}</div>;
}

export default ProfileFriendsData;
