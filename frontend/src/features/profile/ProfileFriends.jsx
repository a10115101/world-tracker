import { useEffect, useState } from "react";

import styles from "./ProfileFriends.module.css";
import { getAllUsers } from "../../services/apiUser";
import { getUser } from "../../services/apiAuth";
import { getFriends } from "../../services/apiFriend";
import ProfileFriendsList from "./ProfileFriendsList";

function ProfileFriends() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchingError, setSearchingError] = useState("");
  const [searchedText, setSearchedText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // const [relationshipResults, setRelationshipResults] = useState([]);

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

  // useEffect(function () {
  //   async function getRelationship() {
  //     try {
  //       const data = await getFriends();
  //       setRelationshipResults(data);
  //       console.log(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   getRelationship();
  // }, []);

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

      <div className={styles.bottomContainer}>
        {isSearching && <p>Searching...</p>}
        {!isSearching && !searchingError && (
          <ProfileFriendsList searchResults={searchResults} />
        )}
        {searchingError && searchingError}
      </div>
    </div>
  );
}

export default ProfileFriends;
