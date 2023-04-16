import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosPrivate from "../../../axios";
import styles from "./TodoItemPage.module.css";
import { checkValidation } from "../../../shared/utils";

const TodoItemPage = () => {
  const [form, setForm] = useState({
    title: {
      name: "title",
      value: "",
      label: "Title",
      type: "text",
      validationRules: {
        required: true,
      },
      touched: false,
      valid: false,
      validationErrors: {},
    },
    description: {
      name: "description",
      value: "",
      label: "Description",
      type: "text",
      validationRules: {
        required: true,
      },
      touched: false,
      valid: false,
      validationErrors: {},
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { todoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsEdit(Boolean(todoId));
  }, [todoId]);

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const todo = await axiosPrivate.get(
            `todos/${todoId}`
          );
          setForm({
            ...form,
            title: { ...form.title, value: todo.title, valid: true },
            description: {
              ...form.description,
              value: todo.description,
              valid: true,
            },
          });
          setFormIsValid(true);
        } catch (error) {
          alert(error);
        }
      })();
    }
  }, [todoId, isEdit]);

  const handleChange = (event) => {
    const name = event.target.name;
    const updatedForm = { ...form };
    const updatedFormElement = { ...updatedForm[name] };
    updatedFormElement.value = event.target.value;

    const validationResult = checkValidation(
      updatedFormElement.value,
      updatedFormElement.validationRules
    );
    updatedFormElement.valid = validationResult.status;
    updatedFormElement.validationErrors = {
      ...validationResult.validationErrors,
    };
    updatedFormElement.touched = true;
    updatedForm[name] = updatedFormElement;

    let formIsValid = true;
    for (let key in updatedForm) {
      formIsValid = updatedForm[key].valid && formIsValid;
    }
    setForm(updatedForm);
    setFormIsValid(formIsValid);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const todoItem = {
      title: form.title.value,
      description: form.description.value,
    };
    try {
      if (isEdit) {
        await axiosPrivate.patch(`todos/${todoId}`, todoItem);
      } else {
        await axiosPrivate.post("todos", todoItem);
      }
      handleGoBack();
    } catch (error) {
      alert(error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    try {
      await axiosPrivate.delete(`todos/${todoId}`);
      handleGoBack();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div >
      <div className='header'>
        <div onClick={handleGoBack}>Back</div>
        <h1 style={{ flex: 1, marginLeft: "1rem" }}>
          {isEdit ? "Edit Todo" : "Add Todo"}{" "}
        </h1>
      </div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <input
              type={form.title.type}
              name={form.title.name}
              value={form.title.value}
              placeholder={form.title.label}
              onChange={handleChange}
            />
            {!form.title.valid && form.title.touched && (
              <div className='field-error-container'>
                {Object.values(form.title.validationErrors).join(" ** ")}
              </div>
            )}
          </div>
          <div className={styles.inputContainer}>
            <input
              type={form.description.type}
              name={form.description.name}
              value={form.description.value}
              placeholder={form.description.label}
              onChange={handleChange}
              style={{ marginTop: "1rem" }}
            />
            {!form.description.valid && form.description.touched && (
              <div className='field-error-container'>
                {Object.values(form.description.validationErrors).join(" ** ")}
              </div>
            )}
          </div>
          <div className={styles.formAction}>
            <input type='button' value='Cancel' onClick={handleGoBack} />
            {isEdit && (
              <input
                type='button'
                style={{ backgroundColor: "salmon" }}
                value='Delete'
                onClick={handleDelete}
              />
            )}
            <input
              type='submit'
              value={isEdit ? "Update" : "Add"}
              disabled={!formIsValid}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoItemPage;
