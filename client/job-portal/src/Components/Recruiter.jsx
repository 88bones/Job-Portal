import React, { useState } from "react";
import "../Css/Register.css";
import Axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Recruiter = () => {
  const [data, setData] = useState({
    companyname: "",
    industry: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
    address: "",
    role: "recruiter",
    logo: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.repassword) {
      setError("Passowrds do not match");
      return;
    }
    if (data.password.length <= 5) {
      setError("Password must be more or equal to 6 digits.");
      return;
    }
    Axios.post("http://localhost:3001/api/recruiters/createRecruiter", {
      companyname: data.companyname,
      industry: data.industry,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      role: data.role,
    })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setSuccess("Account registered successfully!");

        setTimeout(() => {
          //passing email as prop
          navigate("/verify-otp", {
            state: { email: data.email, role: data.role },
          });
          setData({
            companyname: "",
            industry: "",
            email: "",
            password: "",
            repassword: "",
            phone: "",
            address: "",
            role: "",
          });
        });
      }, 0)
      .catch((error) => {
        if (error.response) {
          // message from backend
          setFormError(error.response.data.message);
          //console.log("Backend error:", error.response.data.message);
        } else {
          // fallback (network or unknown error)
          setFormError(error.message);
          //console.log("Error submitting data:", error);
        }
      });
    //onsole.log("Form Data Submitted", data);
  };

  return (
    <div className="form-container">
      <div className="form-sub">
        <h2>Register your company.</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="companyname"
            placeholder="Company Name"
            value={data.companyname}
            onChange={handleChange}
          />
          <select
            name="industry"
            value={data.industry}
            onChange={handleChange}
            required
          >
            <option selected disabled value="">
              Industry
            </option>
            <option value="it">Information Technology</option>
            <option value="mgm">Management</option>
            <option value="er">Engineering</option>
            <option value="med">Medical</option>
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
          {formError && <span style={{ color: "red" }}>{formError}</span>}
        </form>
        <div className="login">
          <p>
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recruiter;
