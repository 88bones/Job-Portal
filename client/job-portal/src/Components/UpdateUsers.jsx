import React, { useEffect, useState } from "react";
import defUser from "../Images/account.svg";
import defRecruiter from "../Images/recDefault.png";
import "../Css/UpdateUsers.css";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateUsers = () => {
  const { _id, role } = useSelector((state) => state.user);
  const [imgError, setImgError] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [imgPreview, setImgPreview] = useState(defUser);

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
  const [dataRec, setDataRec] = useState({
    companyname: "",
    industry: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
    address: "",
    logo: "",
  });
  useEffect(() => {
    //GET USER
    if (_id && role === "user") {
      axios
        .get(`http://localhost:3001/api/users/getUser/${_id}/${role}`)
        .then((response) => {
          const user = response.data;
          // console.log(user);
          setData({
            fullname: user.fullname || "",
            email: user.email || "",
            address: user.address || "",
            phone: user.phone || "",
            resume: user.resume || "",
            image: user.image || "",
            skills: Array.isArray(user.skills) ? user.skills : [],
          });
          setImgPreview(
            user.image ? `http://localhost:3001/uploads/${image}` : defUser
          );
        })
        .catch((err) => {
          console.log("error", err);
        });
      //GET RECRUITER
    } else if (_id && role === "recruiter") {
      axios
        .get(`http://localhost:3001/api/users/getUser/${_id}/${role}`)
        .then((response) => {
          const recruiter = response.data;
          // console.log(recruiter);
          setDataRec({
            companyname: recruiter.companyname || "",
            industry: recruiter.industry || "",
            email: recruiter.email || "",
            phone: recruiter.phone || "",
            address: recruiter.address || "",
            logo: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [_id, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (role === "user") {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (role === "recruiter") {
      setDataRec((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (role === "user") {
      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      formData.append("address", data.address);
      formData.append("phone", data.phone);
      formData.append("skills", JSON.stringify(data.skills));

      if (data.image) formData.append("image", data.image);
      if (data.resume) formData.append("resume", data.resume);
    } else if (role === "recruiter") {
      formData.append("companyname", dataRec.companyname);
      formData.append("industry", dataRec.industry);
      formData.append("email", dataRec.email);
      formData.append("phone", dataRec.phone);
      formData.append("address", dataRec.address);

      if (dataRec.logo) formData.append("logo", dataRec.logo);
    }

    axios
      .put(
        `http://localhost:3001/api/users/updateUser/${_id}/${role}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setSuccess("Profile updated!");
      })
      .catch((err) => {
        setError("Profile NOT updated!");
      });
  };

  return (
    <div className="user-form-container">
      <h2 className="form-heading">My Profile</h2>
      {role === "user" && (
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="image">
            <img src={imgPreview} alt="Profile Picture" width="50px" />
            <input
              type="file"
              name="image"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setData({ ...data, image: file });
                  setImgPreview(URL.createObjectURL(file));
                }
              }}
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
          <label htmlFor="resumeview">Current Resume: {data.resume}</label>

          <button type="submit">Save user</button>
          <span style={{ color: "green", fontSize: "14px" }}>{success}</span>
          <span style={{ color: "red", fontSize: "14px" }}>{error}</span>
        </form>
      )}
      {/* END OF USER */}

      {/* FOR RECRUITER */}
      {role === "recruiter" && (
        <form onSubmit={handleSubmit} className="user-form">
          <div className="image">
            <img src={defRecruiter} alt="" width="50px" />
            <input
              type="file"
              name="image"
              //onChange={(e) => setData({ ...data, image: e.target.files[0] })}
              // onChange={handleImageChange}
            />
          </div>
          <br />
          <input
            type="text"
            name="companyname"
            placeholder="Company Name"
            value={dataRec.companyname}
            onChange={handleChange}
          />
          <select
            name="industry"
            value={dataRec.industry}
            onChange={handleChange}
            required
          >
            <option disabled value="">
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
            value={dataRec.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={dataRec.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={dataRec.address}
            onChange={handleChange}
            required
          />

          <button className="register-btn" type="submit">
            Save Recruiter
          </button>
          {success && (
            <span className="success-span" style={{ color: "green" }}>
              {success}
            </span>
          )}
          {error && <span style={{ color: "red" }}>{error}</span>}
        </form>
      )}
    </div>
  );
};

export default UpdateUsers;
