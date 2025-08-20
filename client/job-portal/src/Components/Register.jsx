import React, { useState } from "react";
import "../Css/Register.css";
import Axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

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
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
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

    if (data.password.length <= 6) {
      setError("Password must be more or equal to 8 digits.");
      return;
    }
    Axios.post("http://localhost:3001/api/users/createUser", {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      address: data.address,
      phone: data.phone,
    })
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        // console.log("Token:", token);
        setSuccess("Account created successfully!");
        setData({
          fullname: "",
          email: "",
          password: "",
          repassword: "",
          address: "",
          phone: "",
        });
        //passing email as prop
        navigate("/verify-otp", { state: { email: data.email } });
      })
      .catch((error) => {
        setFormError("Not submitted!");
        console.log("Error submitting data.", error);
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
          {success && (
            <span className="success-span" style={{ color: "green" }}>
              {success}
            </span>
          )}
          {formError && <span style={{ color: "red" }}>{formError}</span>}
        </form>
        <div className="login">
          <p>
            Already have an account? <NavLink to={"/login"}>Login!</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
