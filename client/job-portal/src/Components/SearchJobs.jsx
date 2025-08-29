import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { searchJob } from "../services/getJobDetails";
import NavBar from "./NavBar";
import recDefault from "../Images/recDefault.png";
import "../Css/JobListings.css";

const SearchJobs = () => {
  const { keyword } = useParams();
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await searchJob(keyword);
        setJobs(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, [keyword]);

  const getDaysRemaining = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days left` : "Expired";
  };

  return (
    <>
      <NavBar />
      <div className="jobs-grid-container">
        <h2>Results for "{keyword}"</h2>
        <div className="jobs-grid">
          {jobs.length > 0 ? (
            jobs.map((job) => {
              const expired = new Date(job.expiryDate) < new Date();
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
                      <p className="company-name">
                        {job.postedBy?.companyname}
                      </p>
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
            })
          ) : (
            <p>No jobs found for "{keyword}"</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchJobs;
