import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../Css/JobListings.css";

const JobListings = () => {
  const [listOfJobs, setListOfJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/jobs/getJobs")
      .then((response) => {
        setListOfJobs(response.data);
      })
      .catch((error) => console.log("Error fetching jobs: ", error));
  }, []);

  const getDaysRemaining = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();

    const diff = expiry - today;

    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : "Expired";
  };

  return (
    <div className="jobs-grid-container">
      <h2>Available Jobs</h2>
      <div className="jobs-grid">
        {listOfJobs.map((job) => (
          <div key={job._id} className="job-card">
            <div className="job-header">
              <img
                src={job.postedBy?.image || "/Uploads/recDefault.png"}
                alt="Company Logo"
                className="company-logo"
              />
              <div className="company-info">
                <p className="company-name">{job.postedBy?.companyname}</p>
                <p className="posted-days">
                  {getDaysRemaining(job.expiryDate)} days left
                </p>
              </div>
            </div>
            <h3 className="job-title">{job.title}</h3>
            <div className="tags">
              <span className="tag">{job.emptype}</span>
              <span className="tag">{job.level}</span>
              <span className="tag">{job.address}</span>
            </div>
            <div className="footer">
              <button className="apply-button">
                <NavLink>Apply now</NavLink>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListings;
