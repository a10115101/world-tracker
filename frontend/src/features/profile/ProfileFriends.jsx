import { useEffect, useState } from "react";

import ProfileFriendsAllList from "./ProfileFriendsAllList";
import ProfileFriendsPendingList from "./ProfileFriendsPendingList";
import ProfileFriendsSearchList from "./ProfileFriendsSearchList";

import { getAllUsers } from "../../services/apiUser";
import { getUser } from "../../services/apiAuth";
import { getFriends } from "../../services/apiFriend";
import styles from "./ProfileFriends.module.css";

function ProfileFriends() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchingError, setSearchingError] = useState("");
  const [searchedText, setSearchedText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState("");
  const [relationship, setRelationship] = useState([]);
  const [friends, setFriends] = useState([]);
  const [pending, setPending] = useState([]);
  const [requesting, setRequesting] = useState([]);

  const [mode, setMode] = useState("all");

  const userInfo = getUser().user;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!searchedText) return;
      setMode("search");
      setIsSearching(true);
      setSearchingError("");

      const results = await getAllUsers(searchedText);
      // console.log(results);
      // const results = data.filter(
      //   (el) => el.username.includes(searchedText) && el._id !== userInfo._id
      // );
      setSearchResults(results);
    } catch (err) {
      setSearchingError("Searching Error");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(function () {
    async function getRelationship() {
      try {
        setIsLoading(true);
        setLoadingError("");

        const data = await getFriends();
        setRelationship(data);

        setFriends(data.filter((el) => el.status === 1 || el.status === 3));
        setPending(data.filter((el) => el.status === 2));
        // setRequesting(data.filter((el) => el.status === 1));
      } catch (err) {
        setLoadingError("Loading Error");
      } finally {
        setIsLoading(false);
      }
    }

    getRelationship();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.topContainerLeft}>
          <button onClick={() => setMode("all")}>All</button>
          <button onClick={() => setMode("pending")}>Pending</button>
        </div>
        <div className={styles.topContainerRight}>
          <form onSubmit={handleSubmit}>
            <button>
              <i className="fa-solid fa-magnifying-glass" />
            </button>
            <input
              type="text"
              placeholder="Search for friend"
              value={searchedText}
              onChange={(e) => setSearchedText(e.target.value)}
            />
          </form>
        </div>
      </div>

      {/* {console.log(friends)}
      {console.log(pending)}
      {console.log(requesting)} */}

      <div className={styles.bottomContainer}>
        {mode === "all" && (
          <>
            {isLoading && <p>Loading...</p>}
            {!isLoading && !loadingError && (
              <ProfileFriendsAllList friends={friends} />
            )}
            {loadingError && loadingError}
          </>
        )}

        {mode === "pending" && (
          <>
            {isLoading && <p>Loading...</p>}
            {!isLoading && !loadingError && (
              <ProfileFriendsPendingList pending={pending} />
            )}
            {loadingError && loadingError}
          </>
        )}

        {mode === "search" && (
          <>
            {isSearching && <p>Searching...</p>}
            {!isSearching && !searchingError && (
              <ProfileFriendsSearchList
                searchResults={searchResults}
                relationship={relationship}
              />
            )}
            {searchingError && searchingError}
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileFriends;
