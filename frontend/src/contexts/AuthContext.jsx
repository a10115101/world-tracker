import { createContext, useContext, useState } from "react";

import { getCurrentUser } from "src/utilities/localStorage";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext is used outside AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
