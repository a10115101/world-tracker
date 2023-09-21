import { useState } from "react";
import { Link } from "react-router-dom";

import AcceptFriendButton from "../button/AcceptFriendButton";
import CancelFriendButton from "../button/CancelFriendButton";
import styles from "./list.module.css";

function PendingFriendsList({ pending }) {
  const [isHandlingAccept, setIsHandlingAccept] = useState(false);
  const [isHandlingCancel, setIsHandlingCancel] = useState(false);

  return (
    <>
      {pending.length > 0 ? (
        pending.map((el) => (
          <div className={styles.container} key={el._id}>
            <div className={styles.leftContainer}>
              <Link
                to={`http://localhost:5173/profile/user/${el.recipient._id}`}
              >
                <img
                  src={`http://localhost:3000/public/users/${el.recipient.photo}`}
                  alt="photo"
                  width="75"
                />
                <h2>Name: {el.recipient.username}</h2>
                <h2>Status: {el.status}</h2>
              </Link>
            </div>

            <div className={styles.rightContainer}>
              {!isHandlingAccept && !isHandlingCancel && (
                <>
                  <span
                    onClick={() => {
                      setIsHandlingAccept(true);
                    }}
                  >
                    <AcceptFriendButton user={el} />
                  </span>
                  <span
                    onClick={() => {
                      setIsHandlingCancel(true);
                    }}
                  >
                    <CancelFriendButton user={el} />
                  </span>
                </>
              )}

              {(isHandlingAccept || isHandlingCancel) && <p>handling...</p>}
            </div>
          </div>
        ))
      ) : (
        <h3>No Data!</h3>
      )}
    </>
  );
}

export default PendingFriendsList;
