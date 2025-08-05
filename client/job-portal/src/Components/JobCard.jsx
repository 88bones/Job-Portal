import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobDetails } from "../services/getJobDetails";
import { useSelector } from "react-redux";
import "../Css/JobCard.css";
import { postApplication } from "../services/postApplication";

const JobCard = () => {
  const { _id: jobId } = useParams();
  const { _id: userId } = useSelector((state) => state.user);
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState();

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

    const result = await postApplication(jobId, userId);
    if (result.success) {
      console.log("Applied successfully!");
    } else {
      setError(result.message);
    }
  };

  return (
    <>
      <div className="job-card-container">
        <header className="job-card-header">
          <h1>Job card details</h1>
        </header>
        {error && (
          <div
            className="error-message"
            style={{ color: "red", padding: "10px" }}
          >
            <p>{error}</p>
          </div>
        )}
        <div className="job-card-holder">
          <div className="job-card-box">
            <h2>{jobData.postedBy?.companyname}</h2>
            <h3>Title: {jobData.title}</h3>
            <p>Address: {jobData.address}</p>
            <p>Description: {jobData.description}</p>
            <p>Salary: {jobData.salary}</p>
            <p>
              Skills Required:{" "}
              {Array.isArray(jobData.skills) ? jobData.skills.join(", ") : ""}
            </p>
            <button onClick={handleApply}>Apply</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
