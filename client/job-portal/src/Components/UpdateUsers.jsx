import React, { useEffect, useState } from "react";
import defUser from "../Images/account.svg";
import "../Css/UpdateUsers.css";
import axios from "axios";

const UpdateUsers = ({ _id, role }) => {
  const [imgError, setImgError] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    repassword: "",
    address: "",
    phone: "",
    resume: "",
    image: "",
    skills: [],
  });

  useEffect(() => {
    if (_id && role === "user") {
      axios
        .get(`http://localhost:3001/api/users/getUser/${_id}/${role}`)
        .then((response) => {
          const user = response.data;
          console.log(user);
          setData({
            fullname: user.fullname || "",
            email: user.email || "",
            address: user.address || "",
            phone: user.phone || "",
            resume: "",
            image: "",
            skills: Array.isArray(user.skills) ? user.skills : [],
          });
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else if (_id && role === "recruiter") {
      axios
        .get(`http://localhost:3001/api/users/getUser/${_id}/${role}`)
        .then((response) => {
          const recruiter = response.data;
          console.log(recruiter);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [_id, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setImgError("Upload image (jpeg, png, jpg)");
      return;
    }
    setImgError("");
    setData({ ...data, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/api/users/updateUser/${_id}`, data)
      .then((response) => {
        const user = response.data;
        setSuccess("User updated!");
      })
      .catch((err) => {
        setError("User NOT updated!");
      });
    console.log("Updated :", data);
  };

  return (
    <div className="user-form-container">
      <h2 className="form-heading">My Profile</h2>
      {role === "user" && (
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="image">
            <img src={defUser} alt="" width="50px" />
            <input
              type="file"
              name="image"
              //onChange={(e) => setData({ ...data, image: e.target.files[0] })}
              onChange={handleImageChange}
            />
          </div>
          <span style={{ color: "red", fontSize: "14px" }}>{imgError}</span>

          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={data.fullname}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />

          {/* <input
          type="text"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        /> */}

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={data.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={data.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="skill"
            placeholder="Skills (comma separated)"
            value={Array.isArray(data.skills) ? data.skills.join(", ") : ""}
            onChange={(e) =>
              setData({
                ...data,
                skills: e.target.value.split(",").map((s) => s.trim()),
              })
            }
          />
          <br />

          <div className="resume">
            <label htmlFor="">Resume:</label>
            <input
              type="file"
              name="resume"
              onChange={(e) => setData({ ...data, resume: e.target.files[0] })}
            />
          </div>

          <button type="submit">Save user</button>
          <span style={{ color: "green", fontSize: "14px" }}>{success}</span>
          <span style={{ color: "red", fontSize: "14px" }}>{error}</span>
        </form>
      )}
    </div>
  );
};

export default UpdateUsers;
