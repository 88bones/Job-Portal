import React from "react";
import { NavLink } from "react-router-dom";
import "../Css/Register.css";

const Login = () => {
  return (
    <div className="form-container">
      <div className="form-sub">
        <h2>Login.</h2>
        <form action="">
          <input type="email" name="email" placeholder="E-mail" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button className="register-btn">Login</button>
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
