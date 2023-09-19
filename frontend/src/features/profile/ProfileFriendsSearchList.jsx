import AddFriendButton from "./button/AddFriendButton";

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
        matchResults.map((el) => (
          <div className={styles.container} key={el._id}>
            <div className={styles.leftContainer}>
              <img
                src={`http://localhost:3000/public/users/${el.photo}`}
                alt="avatar"
                width="80"
              />
            </div>
            <div className={styles.centerContainer}>
              <div>Name: {el.username}</div>
              <div>Status: {el.status}</div>
            </div>
            <div className={styles.rightContainer}>
              {userInfo._id !== el._id && el.status === 0 && (
                <AddFriendButton user={el} />
              )}
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
