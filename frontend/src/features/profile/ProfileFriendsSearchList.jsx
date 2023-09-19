import styles from "./ProfileFriendsList.module.css";

function ProfileFriendsList({ searchResults }) {
  return (
    <>
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
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
              <div></div>
            </div>
            <div className={styles.rightContainer}>
              <button>Add</button>
              <button>Accept</button>
              <button>Reject</button>
              <button>Remove</button>
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
