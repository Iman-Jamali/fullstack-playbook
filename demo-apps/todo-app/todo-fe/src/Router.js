import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import TodoListPage from "./pages/Todo/TodoListPage";
import TodoItemPage from "./pages/Todo/TodoItemPage/TodoItemPage";
import NotFound from "./NotFound";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import RegistrationPage from "./pages/Auth/RegistrationPage/RegistrationPage";
import AuthPage from "./pages/Auth/AuthPage/AuthPage";
import Layout from "./components/Layout";
import UnauthorizedPage from "./pages/Auth/Unauthorized";
import RequireAuth from "./components/RequiredAuth";

const Router = () => {
  const { isLoggedIn, login, token } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (Boolean(token) && Boolean(userId)) {
        login(token, userId);
      }
    }
  }, [isLoggedIn, token, login]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          {/* Public routes */}
          <Route path={"auth"} element={<AuthPage />}>
            <Route path={"login"} element={<LoginPage />} />
            <Route path={"register"} element={<RegistrationPage />} />
            <Route path={"unauthorized"} element={<UnauthorizedPage />} />
          </Route>

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route path={"todos"}>
              <Route index element={<TodoListPage />} />
              <Route path={":todoId"} element={<TodoItemPage />} />
              <Route path={"create"} element={<TodoItemPage />} />
            </Route>
          </Route>

          {/* Redirects */}
          <Route path={"/"} element={<Navigate to='/todos' replace />} />

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
