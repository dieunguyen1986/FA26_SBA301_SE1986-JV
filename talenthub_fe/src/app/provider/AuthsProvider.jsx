import { useState } from "react";
import { AuthsContext } from "./AuthsContext";

const AuthsProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (resData) => {
    // Store data to localStorage

    setUser(resData);
  };

  return <AuthsContext.Provider value={{ user, login }}>{children}</AuthsContext.Provider>;
};

export default AuthsProvider;
