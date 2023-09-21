import { Link } from "react-router-dom";

import AddFriendButton from "../button/AddFriendButton";
import { getUser } from "../../../../services/apiAuth";
import styles from "./list.module.css";

function SearchFriendsList({ searchResults, relationship }) {
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
              <Link to={`http://localhost:5173/profile/user/${el._id}`}>
                <img
                  src={`http://localhost:3000/public/users/${el.photo}`}
                  alt="photo"
                  width="75"
                />
                <h2>Name: {el.username}</h2>
                <h2>Status: {el.status}</h2>
              </Link>
            </div>

            <div className={styles.rightContainer}>
              {userInfo._id !== el._id && el.status === 0 && (
                <AddFriendButton user={el} />
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
