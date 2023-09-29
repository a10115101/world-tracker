import { Link } from "react-router-dom";

import CancelFriendButton from "../button/CancelFriendButton";
import { backendPort, frontendPort } from "src/utilities/port";
import { formatFriendship } from "src/utilities/format";
import styles from "./list.module.css";

function AllFriendsList({ friends, isLoading, loadingError }) {
  if (isLoading) return <h3>Loading...</h3>;

  if (loadingError) return <h3>{loadingError}</h3>;

  return (
    <>
      {friends.length > 0 ? (
        friends.map((el) => (
          <div className={styles.container} key={el._id}>
            <div className={styles.leftContainer}>
              <Link to={frontendPort(`profile/user/${el.recipient._id}`)}>
                <img
                  src={backendPort(`public/users/${el.recipient.photo}`)}
                  alt="photo"
                />
                <div>
                  <h4>Name: </h4>
                  <h2>{el.recipient.username}</h2>
                </div>
                <div>
                  <h4>Status: </h4>
                  <h2>{formatFriendship(el.status)}</h2>
                </div>
              </Link>
            </div>
            <div className={styles.rightContainer}>
              <CancelFriendButton user={el}>
                {el.status === 1 ? "Cancel" : "Remove"}
              </CancelFriendButton>
            </div>
          </div>
        ))
      ) : (
        <h3>No Friends!</h3>
      )}
    </>
  );
}

export default AllFriendsList;
