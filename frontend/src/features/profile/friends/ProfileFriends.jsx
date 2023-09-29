import { useEffect, useState } from "react";

import AllFriendsList from "./list/AllFriendsList";
import PendingFriendsList from "./list/PendingFriendsList";
import SearchFriendsList from "./list/SearchFriendsList";
import SwitchModeButtonSet from "./button/SwitchModeButtonSet";
import ProfileFriendsSearch from "./search/ProfileFriendsSearch";
import { useFriends } from "src/contexts/FriendsContext";
import { getFriends } from "src/services/apiFriend";
import styles from "./ProfileFriends.module.css";

function ProfileFriends() {
  const { update } = useFriends();

  const [isSearching, setIsSearching] = useState(false);
  const [searchingError, setSearchingError] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState("");
  const [relationship, setRelationship] = useState([]);
  const [friends, setFriends] = useState([]);
  const [pending, setPending] = useState([]);
  const [mode, setMode] = useState("all");

  useEffect(
    function () {
      async function getRelationship() {
        try {
          setIsLoading(true);
          setLoadingError("");
          const data = await getFriends();
          setRelationship(data);
          setFriends(data.filter((el) => el.status === 1 || el.status === 3));
          setPending(data.filter((el) => el.status === 2));
        } catch (err) {
          setLoadingError("Loading Error");
        } finally {
          setIsLoading(false);
        }
      }
      getRelationship();
    },
    [update]
  );

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.topContainerLeft}>
          <SwitchModeButtonSet
            mode={mode}
            setMode={setMode}
            friends={friends}
            pending={pending}
          />
        </div>

        <div className={styles.topContainerRight}>
          <ProfileFriendsSearch
            setMode={setMode}
            setIsSearching={setIsSearching}
            setSearchingError={setSearchingError}
            setSearchResults={setSearchResults}
          />
        </div>
      </div>

      <div className={styles.bottomContainer}>
        {mode === "all" && (
          <AllFriendsList
            friends={friends}
            isLoading={isLoading}
            loadingError={loadingError}
          />
        )}

        {mode === "pending" && (
          <PendingFriendsList
            pending={pending}
            isLoading={isLoading}
            loadingError={loadingError}
          />
        )}

        {mode === "search" && (
          <SearchFriendsList
            searchResults={searchResults}
            relationship={relationship}
            isSearching={isSearching}
            searchingError={searchingError}
          />
        )}
      </div>
    </div>
  );
}

export default ProfileFriends;
