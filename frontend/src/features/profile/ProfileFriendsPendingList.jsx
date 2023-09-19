import styles from "./ProfileFriendsList.module.css";

function ProfileFriendsPendingList({ pending }) {
  return (
    <>
      {/* {console.log(pending)} */}
      {pending.length > 0 ? (
        pending.map((el) => (
          <div className={styles.container} key={el._id}>
            <div className={styles.leftContainer}>
              <img
                src={`http://localhost:3000/public/users/${el.recipient.photo}`}
                alt="avatar"
                width="80"
              />
            </div>
            <div className={styles.centerContainer}>
              <div>Name: {el.recipient.username}</div>
              <div>Status: {el.status}</div>
            </div>
            <div className={styles.rightContainer}>
              <button>Accept</button>
              <button>Reject</button>
            </div>
          </div>
        ))
      ) : (
        <p>Not Data!</p>
      )}
    </>
  );
}

export default ProfileFriendsPendingList;
