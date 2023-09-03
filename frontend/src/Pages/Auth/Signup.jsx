import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../config/request";
import { useRef } from "react";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    name: "",
    email: "",
    password: "",
  });

  const { first_name, last_name, name, email, password } = data;

  const submitButton = useRef();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const button = document.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = "Loading...";
    console.log(first_name, last_name, email, password);

    if (first_name && last_name && email && password) {
      setData({ ...data, name: `${first_name} ${last_name}` });

      try {
        const response = await sendRequest({
          method: "POST",
          route: "/users/register",
          body: data,
        });

        if (response.status === "success") {
          submitButton.current.disabled = false;
          submitButton.current.textContent = "Success";

          setTimeout(() => {
            submitButton.current.textContent = "Redirecting To Login Page...";
          }, 1000);

          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        submitButton.current.disabled = false;
        submitButton.current.textContent = "Failed";
        setTimeout(() => {
          submitButton.current.textContent = "Sign Un";
        }, 2000);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Book Connect</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            value={first_name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={last_name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <button type="submit" ref={submitButton} onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/">
            <span className="auth-switch-link">Log In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
