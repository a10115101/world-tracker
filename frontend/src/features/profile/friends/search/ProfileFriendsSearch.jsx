import { useState } from "react";

import { getAllUsers } from "src/services/apiUser";
import styles from "./ProfileFriendsSearch.module.css";

function ProfileFriendsSearch({
  setMode,
  setIsSearching,
  setSearchingError,
  setSearchResults,
}) {
  const [searchedText, setSearchedText] = useState("");

  const handleSearching = async (e) => {
    try {
      e.preventDefault();

      if (!searchedText) return;

      setMode("search");
      setIsSearching(true);
      setSearchingError("");
      const results = await getAllUsers(searchedText);
      setSearchResults(results);
    } catch (err) {
      setSearchingError("Searching Error");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSearching}>
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
  );
}

export default ProfileFriendsSearch;
