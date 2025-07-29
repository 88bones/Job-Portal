import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobDetails } from "../services/getJobDetails";
import { useSelector } from "react-redux";
import axios from "axios";
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
            <p>{jobData.postedBy?.companyname}</p>
            <p>{jobData.title}</p>
            <p>{jobData.address}</p>
            <p>{jobData.description}</p>
            <button onClick={handleApply}>Apply</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
