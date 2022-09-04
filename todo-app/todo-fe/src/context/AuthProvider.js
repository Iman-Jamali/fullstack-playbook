import { useState, createContext } from "react";

const AuthContext = createContext({
  token: "",
  userId: "",
  isLoggedIn: false,
  login: (token, userId) => {},
  logout: () => {},
});

export const AuthContextProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const userIsLoggedIn = Boolean(token);
  const loginHandler = (token, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  };
  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const contextValue = {
    token,
    userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
