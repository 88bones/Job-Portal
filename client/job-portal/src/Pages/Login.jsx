import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/Register.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice"; // import Redux action

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3001/api/login/loginUsers",
        {
          email,
          password,
        }
      );

      const { token, user, message } = res.data;

      if (message === "Success") {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // dispatch login to redux
        dispatch(
          login({
            fullname: user.fullname,
            role: user.role,
            _id: user._id,
            email: user.email,
          })
        );

        // localStorage.setItem("address", user.address);
        // localStorage.setItem("phone", user.phone);

        navigate("/");
      } else {
        setError(message || "Login failed");
      }
    } catch (err) {
      console.error(err);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Credentials Invalid!!");
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-sub">
        <h2>Login.</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
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
            Don't have an account? <NavLink to={"/register"}>Register!</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
