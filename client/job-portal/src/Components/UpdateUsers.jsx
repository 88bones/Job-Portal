import React, { useEffect } from "react";
import defUser from "../Images/account.svg";
import "../Css/UpdateUsers.css";

const UpdateUsers = () => {
  const userData = localStorage.getItem("user");
  const parsedData = JSON.parse(userData);
  console.log(parsedData["fullname"]);

  return (
    <div className="user-form-container">
      <h2 className="form-heading">My Profile</h2>
      <form className="user-form">
        <div className="image">
          <img src={defUser} alt="" width="50px" />
          <input
            type="file"
            name="image"
            placeholder="Image URL"

            // value={user.image}
            // onChange={handleChange}
          />
        </div>
        <br />

        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          // value={user.fullname}
          // onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          // value={user.email}
          // onChange={handleChange}
        />

        <input
          type="text"
          name="password"
          placeholder="Password"
          // value={user.password}
          // onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          // value={user.address}
          // onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          // value={user.phone}
          // onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          // value={user.skills}
          // onChange={handleChange}
        />

        <div className="resume">
          <label htmlFor="">Resume:</label>
          <input
            type="file"
            name="resume"
            placeholder="Resume URL"
            // value={user.resume}
            // onChange={handleChange}
          />
        </div>

        <button type="submit">Save user</button>
      </form>
    </div>
  );
};

export default UpdateUsers;
