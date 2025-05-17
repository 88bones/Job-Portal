import React from "react";
import { useParams } from "react-router-dom";

const ApplyJob = () => {
  const { jobId } = useParams();

  return (
    <div className="apply-job-container">
      <div className="job-display-container">
        <h1>{jobId}</h1>
      </div>
    </div>
  );
};

export default ApplyJob;
