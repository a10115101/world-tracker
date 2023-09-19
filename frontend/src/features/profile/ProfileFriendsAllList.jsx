import { Link } from "react-router-dom";
import CancelFriendButton from "./button/CancelFriendButton";

import styles from "./ProfileFriendsList.module.css";

function ProfileFriendsAllList({ friends }) {
  return (
    <>
      {friends.length > 0 ? (
        friends.map((el) => (
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
              <CancelFriendButton user={el} />
            </div>
          </div>
        ))
      ) : (
        <p>No Friends!</p>
      )}
    </>
  );
}

export default ProfileFriendsAllList;
