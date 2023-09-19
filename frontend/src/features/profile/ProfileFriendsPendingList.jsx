import styles from "./ProfileFriendsList.module.css";
import AcceptFriendButton from "./button/AcceptFriendButton";
import CancelFriendButton from "./button/CancelFriendButton";

function ProfileFriendsPendingList({ pending }) {
  return (
    <>
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
              <AcceptFriendButton user={el} />
              <CancelFriendButton user={el} />
            </div>
          </div>
        ))
      ) : (
        <p>No Data!</p>
      )}
    </>
  );
}

export default ProfileFriendsPendingList;
