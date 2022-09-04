import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axiosPrivate from "../../axios";
import config from "../../shared/config";
import { RouteList } from "../../shared/routeList";
import styles from "./TodoListPage.module.css";

const TodoListPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const todos = await axiosPrivate.get(`${config.apiBaseURL}/todos`);
        const sortedTodoItems = todos.sort((el1, el2) =>
          el2.updatedAt.localeCompare(el1.updatedAt)
        );
        setData(sortedTodoItems);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  const handleItemClicked = (id) => {
    navigate(RouteList.EditTodo.replace(":todoId", id));
  };

  const handleAddTodo = () => {
    navigate(RouteList.AddTodo);
  };

  return (
    <div>
      <div className='header'>
        <h1>Todo List</h1>
      </div>
      <div className={styles.fab}>
        <input type='button' value='Add' onClick={handleAddTodo} />
      </div>
      {data.map((el) => {
        return (
          <div
            className={styles.itemsContainer}
            key={el.id}
            onClick={() => handleItemClicked(el.id)}
          >
            <div>
              <h3>{el.title}</h3>
              <div>{new Date(el.updatedAt).toLocaleString("en-ca")}</div>
              <p>{el.description}</p>
            </div>
          </div>
        );
      })}
      <Outlet />
    </div>
  );
};

export default TodoListPage;
