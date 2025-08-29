import React, { useEffect, useState } from "react";
import "../Css/JobListings.css";
import recDefault from "../Images/recDefault.png";
import { fetchJobListings } from "../services/getJobListings";
import { useNavigate } from "react-router-dom";

const JobListings = ({ selectedFilter, selectedIndustry }) => {
  const [listOfJobs, setListOfJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobListings()
      .then((data) => {
        setListOfJobs(data);
        console.log(data);
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

  const selectedTime = selectedFilter
    ? [...listOfJobs].sort((a, b) => {
        if (selectedFilter === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (selectedFilter === "oldest") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        if (selectedFilter === "nearest-deadline") {
          return new Date(a.expiryDate) - new Date(b.expiryDate);
        }
        if (selectedFilter === "all") return true;
      })
    : listOfJobs;

  const filteredJobs = selectedIndustry
    ? [...selectedTime].filter((job) => {
        if (selectedIndustry === "all") return true;
        return job.postedBy.industry === selectedIndustry;
      })
    : listOfJobs.sort((a, b) => {
        return new Date(b.expiryDate) - new Date(a.expiryDate);
      });

  return (
    <div className="jobs-grid-container">
      <h2>Available Jobs</h2>
      <div className="jobs-grid">
        {filteredJobs.map((job) => {
          const expired = isExpired(job.expiryDate); // per-job
          return (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <img
                  src={
                    job.postedBy?.logo
                      ? `http://localhost:3001/uploads/${job.postedBy?.logo}`
                      : recDefault
                  }
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
                <p className="company-info">
                  {job.salary > 0 ? `Rs. ${job.salary}` : job.salary}
                </p>
                {expired ? (
                  <button className="apply-button" disabled>
                    Expired
                  </button>
                ) : (
                  <button
                    className="apply-button"
                    onClick={() => navigate(`/applyJob/${job._id}`)}
                  >
                    Apply now
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
