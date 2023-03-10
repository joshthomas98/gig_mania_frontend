import React, { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
