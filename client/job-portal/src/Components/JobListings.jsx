import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "../Css/JobListings.css";
import recDefault from "../Images/recDefault.png";
import { fetchJobListings } from "../services/getJobListings";

const JobListings = () => {
  const [listOfJobs, setListOfJobs] = useState([]);

  useEffect(() => {
    fetchJobListings()
      .then((data) => {
        setListOfJobs(data);
      })
      .catch((error) => console.log("Error fetching jobs: ", error));
  }, []);

  const getDaysRemaining = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diff = expiry - today;
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? `${diffDays} Days Left` : "Expired";
  };

  const isExpired = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    return expiry < today;
  };

  return (
    <div className="jobs-grid-container">
      <h2>Available Jobs</h2>
      <div className="jobs-grid">
        {listOfJobs.map((job) => {
          const expired = isExpired(job.expiryDate); // per-job
          return (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <img
                  src={recDefault}
                  alt="Company Logo"
                  className="company-logo"
                />
                <div className="company-info">
                  <p className="company-name">{job.postedBy?.companyname}</p>
                  <p className="posted-days">
                    {getDaysRemaining(job.expiryDate)}
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
                <p className="company-info">{job.salary}</p>
                {expired ? (
                  <button className="apply-button" disabled>
                    Expired
                  </button>
                ) : (
                  <button className="apply-button">
                    <NavLink to={`/applyJob/${job._id}`}>Apply now</NavLink>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobListings;
