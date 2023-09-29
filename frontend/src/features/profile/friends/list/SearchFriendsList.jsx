import { Link } from "react-router-dom";

import AddFriendButton from "../button/AddFriendButton";
import { getCurrentUser } from "src/services/apiAuth";
import { backendPort, frontendPort } from "src/utilities/port";
import { formatFriendship } from "src/utilities/format";
import styles from "./list.module.css";

function SearchFriendsList({
  searchResults,
  isSearching,
  searchingError,
  relationship,
}) {
  const userInfo = getCurrentUser().user;

  const matchResults = searchResults.map((searchResult) => {
    const index = relationship.findIndex(
      (r) => r.recipient._id === searchResult._id
    );

    if (index >= 0) {
      searchResult.status = relationship[index].status;
      return searchResult;
    }

    searchResult.status = 0;
    return searchResult;
  });

  if (isSearching) return <h3>Searching...</h3>;

  if (searchingError) return <h3>{searchingError}</h3>;

  return (
    <>
      {matchResults.length > 0 ? (
        matchResults.map((el) => (
          <div className={styles.container} key={el._id}>
            <div className={styles.leftContainer}>
              <Link to={frontendPort(`profile/user/${el._id}`)}>
                <img
                  src={backendPort(`public/users/${el.photo}`)}
                  alt="photo"
                />
                <div>
                  <h4>Name: </h4>
                  <h2>{el.username}</h2>
                </div>
                <div>
                  <h4>Status: </h4>
                  <h2>
                    {userInfo._id !== el._id
                      ? formatFriendship(el.status)
                      : "None"}
                  </h2>
                </div>
              </Link>
            </div>
            <div className={styles.rightContainer}>
              {userInfo._id !== el._id && el.status === 0 && (
                <AddFriendButton user={el}>Add</AddFriendButton>
              )}
            </div>
          </div>
        ))
      ) : (
        <h3>Not Found!</h3>
      )}
    </>
  );
}

export default SearchFriendsList;
