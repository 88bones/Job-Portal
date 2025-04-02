import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "../Css/Register.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(email, password);
  //   axios
  //     .post("http://localhost:3001/api/login/login", { email, password })
  //     .then((result) => {
  //       console.log(result);
  //       if (result.data === "Success") {
  //         navigate("/");
  //       } else {
  //         navigate("/register");
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <div className="form-container">
      <div className="form-sub">
        <h2>Login.</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="register-btn">
            Login
          </button>
        </form>
        <div className="login">
          <p>
            Don't have an account? <NavLink to={"/register"}>Regsiter!</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
