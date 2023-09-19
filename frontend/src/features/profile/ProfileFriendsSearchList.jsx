import { getUser } from "../../services/apiAuth";
import styles from "./ProfileFriendsList.module.css";

function ProfileFriendsList({ searchResults, relationship }) {
  const userInfo = getUser().user;

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

  return (
    <>
      {matchResults.length > 0 ? (
        matchResults.map((result) => (
          <div className={styles.container} key={result._id}>
            <div className={styles.leftContainer}>
              <img
                src={`http://localhost:3000/public/users/${result.photo}`}
                alt="avatar"
                width="80"
              />
            </div>
            <div className={styles.centerContainer}>
              <div>Name: {result.username}</div>
              <div>Status: {result.status}</div>
            </div>
            <div className={styles.rightContainer}>
              {userInfo._id !== result._id && <button>Add</button>}
            </div>
          </div>
        ))
      ) : (
        <p>Not Found!</p>
      )}
    </>
  );
}

export default ProfileFriendsList;
