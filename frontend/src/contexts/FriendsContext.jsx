import { createContext, useContext, useState } from "react";

const FriendsContext = createContext();

function FriendsProvider({ children }) {
  const [update, setUpdate] = useState("");

  return (
    <FriendsContext.Provider value={{ setUpdate, update }}>
      {children}
    </FriendsContext.Provider>
  );
}

function useFriends() {
  const context = useContext(FriendsContext);

  if (context === undefined)
    throw new Error("FriendsContext is used outside the FriendsProvider");

  return context;
}

export { FriendsProvider, useFriends };
