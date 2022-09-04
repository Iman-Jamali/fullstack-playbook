import React, { useState } from "react";
import styles from "./RegistrationPage.module.css";
import { checkValidation } from "../../../shared/utils";
import axios from "axios";
import * as jose from "jose";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../shared/config";
import useAuth from "../../../hooks/useAuth";
import { RouteList } from "../../../shared/routeList";

const RegistrationPage = () => {
  const [form, setForm] = useState({
    email: {
      name: "email",
      value: "",
      label: "Email",
      type: "email",
      validationRules: {
        required: true,
        isEmail: true,
      },
      touched: false,
      valid: false,
      validationErrors: {},
    },
    password: {
      name: "password",
      value: "",
      label: "Password",
      type: "password",
      validationRules: {
        required: true,
        minLength: 7,
        isPassword: true,
      },
      touched: false,
      valid: false,
      validationErrors: {},
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

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
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value.trim();
    const authData = { email: email, password: password };
    try {
      await axios.post(`${config.apiBaseURL}/auth/register`, authData);
      const response = await axios.post(
        `${config.apiBaseURL}/auth/login`,
        authData
      );
      const decodedUserData = jose.decodeJwt(response.data.accessToken);
      login(response.data.accessToken, decodedUserData.id);
      navigate(RouteList.Todos);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Registration</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            type={form.email.type}
            name={form.email.name}
            value={form.email.value}
            placeholder={form.email.label}
            onChange={handleChange}
          />
          {!form.email.valid && form.email.touched && (
            <div className='field-error-container'>
              {Object.values(form.email.validationErrors).join(" ** ")}
            </div>
          )}
        </div>
        <div className={styles.inputContainer}>
          <input
            type={form.password.type}
            name={form.password.name}
            value={form.password.value}
            placeholder={form.password.label}
            onChange={handleChange}
            style={{ marginTop: "1rem" }}
          />
          {!form.password.valid && form.password.touched && (
            <div className='field-error-container'>
              {Object.values(form.password.validationErrors).join(" ** ")}
            </div>
          )}
        </div>
        <input
          disabled={!formIsValid}
          type='submit'
          value={"Create"}
          onClick={handleSubmit}
          style={{ marginTop: "2rem" }}
        />
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          Having an account?&nbsp;
          <Link to={RouteList.Login}>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
