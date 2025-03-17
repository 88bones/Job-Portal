import React, { useState } from "react";
import "../Css/Register.css";
import Axios from "axios";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    repassword: "",
    address: "",
    phone: "",
    resume: null,
  });

  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setData({
      ...data,
      [name]: type === "file" ? files[0] : value,
    });
    if (name === "repassword") {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.repassword) {
      setError("Passwords do not match!!");
      return;
    }
    Axios.post("http://localhost:3001/createUser", {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      address: data.address,
      phone: data.phone,
    }).then((response) => {
      alert("user created");
    });
    console.log("Form Data Submitted:", data);
  };

  return (
    <div className="form-container">
      <div className="form-sub">
        <h2>Create a new account.</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={data.fullname}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="repassword"
            placeholder="Confirm Password"
            value={data.repassword}
            onChange={handleChange}
            required
          />
          {error && (
            <span style={{ color: "red", fontSize: "14px" }}>{error}</span>
          )}

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={data.address}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={data.phone}
            onChange={handleChange}
            required
          />

          {/* <label>Resume: </label>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            placeholder="resume"
          /> */}

          <button className="register-btn" type="submit">
            Create account
          </button>
        </form>
        <div className="login">
          <p>
            Already have an account? <NavLink>Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
