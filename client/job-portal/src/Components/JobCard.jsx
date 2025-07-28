import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobDetails } from "../services/getJobDetails";

const JobCard = ({}) => {
  const { _id } = useParams();
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetchJobDetails(_id)
      .then((job) => {
        setJobData(job);
        console.log(_id);
      })
      .catch((err) => {
        setError("Error fetching Job. :", err);
      });
  }, [_id]);
  return (
    <>
      <div className="job-card-container">
        <header className="job-card-header">
          <h1>Job card details</h1>
        </header>
        <div className="job-card-holder">
          <div className="job-card-box">
            <p>{jobData.postedBy?.companyname}</p>
            <p>{jobData.title}</p>
            <p>{jobData.address}</p>
            <p>{jobData.description}</p>
            <button>Apply</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
