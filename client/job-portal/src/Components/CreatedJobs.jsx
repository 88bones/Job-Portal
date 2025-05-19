import React, { useEffect, useState } from "react";
import { fetchJob } from "../services/getJobService";
import "../Css/CreatedJobs.css";

const CreatedJobs = ({ _id, fullname }) => {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    fetchJob(_id)
      .then((jobs) => {
        // console.log(jobs);
        setJobData(Array.isArray(jobs) ? jobs : [jobs]);
      })
      .catch((err) => {
        console.error("Error fetching job:", err);
      });
  }, [_id]);

  return (
    <div className="created-jobs-container">
      <div className="created-jobs-view">
        <header>
          <h2>{fullname}'s Job Listings</h2>
        </header>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Salary</th>
              {/* <th>Description</th> */}
              <th>Openings</th>
              <th>Experience</th>
              <th>Address</th>
              <th>Level</th>
              <th>Employment Type</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {jobData.map((job, index) => (
              <tr key={index}>
                <td>{job.title}</td>
                <td>{job.salary}</td>
                {/* <td>{job.description}</td> */}
                <td>{job.openings}</td>
                <td>{job.experience}</td>
                <td>{job.address}</td>
                <td>{job.level}</td>
                <td>{job.emptype}</td>
                <td>{new Date(job.expiryDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatedJobs;
