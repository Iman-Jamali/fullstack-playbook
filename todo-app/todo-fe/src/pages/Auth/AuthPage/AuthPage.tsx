import { Outlet } from "react-router-dom";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
}

export default AuthPage;