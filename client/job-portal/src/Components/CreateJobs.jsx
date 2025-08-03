import React, { useState } from "react";
import "../Css/CreateJobs.css";
import Axios from "axios";
// import stringify from "stringify";

const CreateJobs = ({ fullname }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const emptypes = [
    { name: "Part Time", value: "parttime" },
    { name: "Full Time", value: "fulltime" },
    { name: "Trainee", value: "trainee" },
    { name: "Fellowship", value: "fellow" },
  ];

  const industries = [
    { name: "Information management", value: "it" },
    { name: "Management", value: "mgm" },
    { name: "Engineering", value: "er" },
    { name: "Medical", value: "med" },
  ];

  const levels = [
    { name: "Intern", value: "intern" },
    { name: "Junior", value: "jr" },
    { name: "Mid-Level", value: "mid" },
    { name: "Senior", value: "sr" },
  ];

  const userId = localStorage.getItem("_id");

  const [data, setData] = useState({
    title: "",
    description: "",
    openings: "",
    experience: "",
    address: "",
    level: "",
    emptype: "",
    skills: [],
    postedBy: userId,
    expiryDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/api/jobs/createJob", {
      title: data.title,
      salary: data.salary,
      description: data.description,
      openings: data.openings,
      experience: data.experience,
      address: data.address,
      level: data.level,
      skills: data.skills,
      emptype: data.emptype,
      postedBy: userId,
      expiryDate: data.expiryDate,
    })
      .then((response) => {
        setSuccess("Job created.");
        setData({
          title: "",
          description: "",
          salary: "",
          openings: "",
          experience: "",
          address: "",
          level: "",
          emptype: "",
          postedBy: "",
          expiryDate: "",
        });
      })
      .catch((error) => {
        setError("Not submitted!");
        console.log("error: ", error);
      });
  };

  return (
    <div className="job-create-container">
      <header className="job-header">
        <h2>Create job postings.</h2>
        <h4>{fullname}</h4>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="eg: Software Engineer, Nurse, HR Recruiter etc..."
            value={data.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="openings">Openings</label>
          <input
            type="number"
            name="openings"
            id="openings"
            value={data.openings}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group" style={{ gridColumn: "span 2" }}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={data.description}
            onChange={handleChange}
            rows={5}
            maxLength={500}
            minLength={10}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            name="salary"
            id="salary"
            value={data.salary}
            onChange={handleChange}
            placeholder="Negotiable or Amount"
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <select
            name="industry"
            id="industry"
            value={data.industry}
            onChange={handleChange}
            required
          >
            <option defaultValue>Industry</option>
            {industries.map((industry, index) => (
              <option key={index} value={industry.value}>
                {industry.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience</label>
          <select
            name="experience"
            id="experience"
            value={data.experience}
            onChange={handleChange}
            required
          >
            <option value="0">0 or few months</option>
            <option value="1+">1+ years</option>
            <option value="3+">3+ years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={data.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="level">Level</label>
          <select
            name="level"
            id="level"
            value={data.level}
            onChange={handleChange}
            required
          >
            <option disabled defaultValue value="">
              Level
            </option>
            {levels.map((level, index) => (
              <option key={index} value={level.value}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="emptype">Type</label>
          <select
            name="emptype"
            id="emptype"
            value={data.emptype}
            onChange={handleChange}
            required
          >
            {emptypes.map((type, index) => (
              <option key={index} value={type.value}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills required:</label>
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={Array.isArray(data.skills) ? data.skills.join(", ") : ""}
            onChange={(e) => {
              setData({
                ...data,
                skills: e.target.value.split(",").map((s) => s.trim()),
              });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Valid Until</label>
          <input
            type="date"
            id="date"
            name="expiryDate"
            value={data.expiryDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Job</button>
        {success && <span style={{ color: "green" }}>{success}</span>}
        {error && <span style={{ color: "red" }}>{error}</span>}
      </form>
    </div>
  );
};

export default CreateJobs;
