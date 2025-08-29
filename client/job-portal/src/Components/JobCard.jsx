import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobDetails } from "../services/getJobDetails";
import { useSelector } from "react-redux";
import "../Css/JobCard.css";
import { postApplication } from "../services/postApplication";
import RecommendedJobs from "./RecommendedJobs";
import recDefault from "../Images/recDefault.png";

const JobCard = () => {
  const { _id: jobId } = useParams();
  const { _id: userId, role } = useSelector((state) => state.user);
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    fetchJobDetails(jobId)
      .then((job) => {
        setJobData(job);
        // console.log(_id);
      })
      .catch((err) => {
        setError("Error fetching Job. :", err);
      });
  }, [jobId]);

  const handleApply = async () => {
    if (!userId) {
      setError("Please login to apply");
      return;
    }

    if (role === "recruiter") {
      setError("Recruiter cannot apply for a job");
      return;
    }

    const result = await postApplication(jobId, userId);
    if (result.success) {
      setSuccess(result.message);
    } else {
      setError(result.message);
    }
  };

  return (
    <>
      <div className="job-card-container">
        <header className="job-card-header">
          <h1>Job details</h1>
        </header>
        {error && (
          <div
            className="error-message"
            style={{ color: "red", padding: "10px" }}
          >
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div
            className="success-message"
            style={{ color: "green", padding: "10px" }}
          >
            <p>{success}</p>
          </div>
        )}

        <div className="job-card-holder">
          <div className="job-card-box">
            <div className="job-image">
              <img
                src={
                  jobData.postedBy?.logo
                    ? `http://localhost:3001/uploads/${jobData.postedBy?.logo}`
                    : recDefault
                }
                width="60px"
              />
              <h3>{jobData.title}</h3>
            </div>
            <p>
              <h4>Address:</h4> {jobData.address}
            </p>
            <p>
              <h4>Description:</h4> {jobData.description}
            </p>
            <p>
              <h4>Salary:</h4>
              {jobData.salary > 0 ? `Rs. ${jobData.salary}` : jobData.salary}
            </p>
            <p>
              <h4>Skills:</h4>{" "}
              {Array.isArray(jobData.skills) ? jobData.skills.join(", ") : ""}
            </p>
            <button style={{ width: "100%" }} onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      </div>
      <RecommendedJobs />
    </>
  );
};

export default JobCard;
