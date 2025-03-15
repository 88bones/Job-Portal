import React, { useState } from "react";
import "../Css/Register.css";
import Axios from "axios";

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
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name: </label>
          <input
            type="text"
            name="fullname"
            value={data.fullname}
            onChange={handleChange}
            required
          />

          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />

          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password: </label>
          <input
            type="password"
            name="repassword"
            value={data.repassword}
            onChange={handleChange}
            required
          />
          {error && (
            <span style={{ color: "red", fontSize: "14px" }}>{error}</span>
          )}

          <label>Address: </label>
          <input
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
            required
          />

          <label>Phone: </label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            required
          />

          <label>Resume: </label>
          <input type="file" name="resume" onChange={handleChange} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
