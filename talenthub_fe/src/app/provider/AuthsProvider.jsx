import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthsContext } from "./AuthsContext";

const AuthsProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const setData = () => {
      const userJson = localStorage.getItem("user");
      setUser(JSON.parse(userJson));
    };

    setData();
  }, []);

  const login = useCallback((resData) => {
    // Change state
    setUser(resData);

    // Store data to localStorage
    localStorage.setItem("user", JSON.stringify(resData));

    console.log(localStorage.getItem("user"));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  }, []);

  const contextValues = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  );

  return (
    <AuthsContext.Provider value={contextValues}>
      {children}
    </AuthsContext.Provider>
  );
};

export default AuthsProvider;
