import { useEffect, useState } from "react";

import ProfileFriendsSearchList from "./ProfileFriendsSearchList";
import ProfileFriendsAllList from "./ProfileFriendsAllList";

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

  const userInfo = getUser().user;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!searchedText) return;

      setIsSearching(true);
      setSearchingError("");

      const data = await getAllUsers();
      const results = data.filter(
        (el) => el.username.includes(searchedText) && el._id !== userInfo._id
      );
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
        console.log(data);

        setFriends(data.filter((el) => el.status === 3 || el.status === 1));
        setPending(data.filter((el) => el.status === 2));
        // setRequesting(data.filter((el) => el.status === 1));
      } catch (err) {
        setLoadingError("Loading Error");
        console.log(err);
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
          <button>All</button>
          <button>Pending</button>
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
        {isLoading && <p>Loading...</p>}
        {!isLoading && !loadingError && (
          <ProfileFriendsAllList friends={friends} />
        )}
        {loadingError && loadingError}

        {isSearching && <p>Searching...</p>}
        {!isSearching && !searchingError && (
          <ProfileFriendsSearchList searchResults={searchResults} />
        )}
        {searchingError && searchingError}
      </div>
    </div>
  );
}

export default ProfileFriends;
