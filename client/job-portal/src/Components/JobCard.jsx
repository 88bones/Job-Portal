import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobDetails } from "../services/getJobDetails";

const JobCard = () => {
  const { _id } = useParams();
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetchJobDetails(_id)
      .then((job) => {
        setJobData([job]);
        console.log(job);
      })
      .catch((err) => {
        setError("Error fetching Job. :(", err);
      });
  }, [_id]);
  return (
    <div>
      <h1>Job card details</h1>
      <h2>{_id}</h2>
    </div>
  );
};

export default JobCard;
