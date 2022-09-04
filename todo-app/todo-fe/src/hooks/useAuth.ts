import { useContext } from "react";
import AuthContextProvider from "../context/AuthProvider";

const useAuth = () => {
  return useContext(AuthContextProvider);
};

export default useAuth;