import styles from "./ProfileFriendsList.module.css";

function ProfileFriendsAllList({ friends }) {
  return (
    <>
      {/* {console.log(friends)} */}
      {friends.length > 0 ? (
        friends.map((friend) => (
          <div className={styles.container} key={friend._id}>
            <div className={styles.leftContainer}>
              <img
                src={`http://localhost:3000/public/users/${friend.recipient.photo}`}
                alt="avatar"
                width="80"
              />
            </div>
            <div className={styles.centerContainer}>
              <div>Name: {friend.recipient.username}</div>
              <div>Status: {friend.status}</div>
            </div>
            <div className={styles.rightContainer}>
              <button>Remove</button>
            </div>
          </div>
        ))
      ) : (
        <p>Not Friends!</p>
      )}
    </>
  );
}

export default ProfileFriendsAllList;
