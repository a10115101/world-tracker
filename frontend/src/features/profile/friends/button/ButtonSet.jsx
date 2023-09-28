import { useState } from "react";

import AcceptFriendButton from "./AcceptFriendButton";
import CancelFriendButton from "./CancelFriendButton";

function ButtonSet({ el }) {
  const [handleMode, setHandleMode] = useState("init");

  return (
    <>
      {handleMode === "init" && (
        <>
          <AcceptFriendButton
            user={el}
            handleMode={handleMode}
            setHandleMode={setHandleMode}
          >
            Accept
          </AcceptFriendButton>
          <CancelFriendButton
            user={el}
            handleMode={handleMode}
            setHandleMode={setHandleMode}
          >
            Cancel
          </CancelFriendButton>
        </>
      )}

      {handleMode === "accept" && (
        <AcceptFriendButton
          user={el}
          handleMode={handleMode}
          setHandleMode={setHandleMode}
        >
          Accept
        </AcceptFriendButton>
      )}

      {handleMode === "cancel" && (
        <CancelFriendButton
          user={el}
          handleMode={handleMode}
          setHandleMode={setHandleMode}
        >
          Cancel
        </CancelFriendButton>
      )}
    </>
  );
}

export default ButtonSet;
