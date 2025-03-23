import React, { useState } from "react";
import "../Css/Register.css";
import Axios from "axios";
import { NavLink } from "react-router-dom";

const Recruiter = () => {
  const [data, setData] = useState({
    companyname: "",
    industry: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
    address: "",
    logo: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log(data);
    if (name === "repassword") {
      setError("");
    }
  };

  return (
    <div className="form-container">
      <div className="form-sub">
        <h2>Register your company.</h2>
        <form>
          <input
            type="text"
            name="companyname"
            placeholder="Company Name"
            value={data.companyname}
            onChange={handleChange}
          />
          <select name="industry" value={data.industry} onChange={handleChange}>
            <option selected disabled value="">
              Industry
            </option>
            <option value="it">Information Technology</option>
            <option value="mgm">Management</option>
            <option value="er">Engineering</option>
            <option value="med">Medical</option>
            required
          </select>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
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
            type="tel"
            name="phone"
            placeholder="Phone"
            value={data.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={data.address}
            onChange={handleChange}
            required
          />

          <button className="register-btn" type="submit">
            Create account
          </button>
          {success && (
            <span className="success-span" style={{ color: "green" }}>
              {success}
            </span>
          )}
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

export default Recruiter;
