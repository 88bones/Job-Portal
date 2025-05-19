import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobDetails } from "../services/getJobDetails";

const JobCard = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetchJobDetails(jobId)
      .then((job) => {
        setJobData(Array.isArray(job) ? job : [job]);
      })
      .catch((err) => {
        setError("Error fetching Job. :(", err);
      });
  }, [jobId]);
  return (
    <div>
      <h1>Job card details</h1>
      <h2>{jobId}</h2>
    </div>
  );
};

export default JobCard;
