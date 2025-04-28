import React, { useEffect, useState } from "react";
import defUser from "../Images/account.svg";
import "../Css/UpdateUsers.css";
import axios from "axios";

const UpdateUsers = ({ _id }) => {
  const [imgError, setImgError] = useState("");

  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    repassword: "",
    address: "",
    phone: "",
    resume: "",
    image: "",
    skill: [],
  });

  console.log(_id);
  useEffect(() => {
    if (_id) {
      axios
        .get(`http://localhost:3001/api/users/getUser/${_id}`)
        .then((response) => {
          const user = response.data;
          setData({
            fullname: user.fullname || "",
            email: user.email || "",
            password: "",
            repassword: "",
            address: user.address || "",
            phone: user.phone || "",
            resume: "",
            image: "",
            skill: user.skill || [],
          });
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [_id]);

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

  return (
    <div className="user-form-container">
      <h2 className="form-heading">My Profile</h2>
      <form className="user-form">
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

        <input
          type="text"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />

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
          value={data.skill.join(", ")}
          onChange={(e) =>
            setData({
              ...data,
              skill: e.target.value.split(",").map((s) => s.trim()),
            })
          }
        />

        <div className="resume">
          <label htmlFor="">Resume:</label>
          <input
            type="file"
            name="resume"
            onChange={(e) => setData({ ...data, resume: e.target.files[0] })}
          />
        </div>

        <button type="submit">Save user</button>
      </form>
    </div>
  );
};

export default UpdateUsers;
