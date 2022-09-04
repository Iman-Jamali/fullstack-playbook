import { Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import styles from "./Layout.module.css";

const Layout = () => {
  const { logout, isLoggedIn } = useAuth();
  
  return (
    <main className={"App" + " " + styles.container}>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        {isLoggedIn ? (
          <Link to='/' onClick={logout}>
            Logout
          </Link>
        ) : (
          <Link to='/auth/login'>Login</Link>
        )}{" "}
        | <Link to='todos'>Todos</Link>
      </nav>
      <Outlet />
    </main>
  );
};

export default Layout;
