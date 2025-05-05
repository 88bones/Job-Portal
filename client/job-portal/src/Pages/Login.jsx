import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/Register.css";

const Login = ({ setFullname, setRole, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    setError("");

    axios
      .post("http://localhost:3001/api/login/loginUsers", { email, password })
      .then((result) => {
        const { token, user } = result.data;
        // console.log(result.data);
        if (result.data.message === "Success") {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("fullname", user.fullname);
          localStorage.setItem("role", user.role);
          localStorage.setItem("_id", user._id);
          localStorage.setItem("address", user.address);
          localStorage.setItem("phone", user.phone);
          // console.log("UserId: ", user._id);
          setFullname(user.fullname);
          setRole(user.role);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setError("Credentials Invalid!!");
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setError("");
  };

  return (
    <div className="form-container">
      <div className="form-sub">
        <h2>Login.</h2>
        <form onSubmit={handleSubmit} onChange={handleChange}>
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
        {error && (
          <span
            className="login-error"
            style={{ color: "red", fontWeight: "600", textAlign: "center" }}
          >
            {error}
          </span>
        )}
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
