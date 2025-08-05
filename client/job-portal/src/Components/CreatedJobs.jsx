import React, { useEffect, useState } from "react";
import { fetchJob } from "../services/getJobService";
import "../Css/CreatedJobs.css";
import { useSelector } from "react-redux";
import { deleteJob } from "../services/deleteJob";

const CreatedJobs = () => {
  const { _id: userId, fullname } = useSelector((state) => state.user);
  const [jobData, setJobData] = useState([]);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchJob(userId)
      .then((jobs) => {
        // console.log(jobs);
        setJobData(Array.isArray(jobs) ? jobs : [jobs]);
      })
      .catch((err) => {
        console.error("Error fetching job:", err);
      });
  }, [userId]);

  const handleDelete = async (jobId) => {
    const result = await deleteJob(jobId);

    if (result.error) {
      setSuccess(result.error);
    } else {
      setSuccess("Deleted successfully");
      setJobData((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    }
  };

  return (
    <div className="created-jobs-container">
      <div className="created-jobs-view">
        <header>
          <h2>{fullname}'s Job Listings</h2>
        </header>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Salary</th>
              {/* <th>Description</th> */}
              <th>Openings</th>
              <th>Experience</th>
              <th>Address</th>
              <th>Level</th>
              <th>Employment Type</th>
              <th>Expiry Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobData.map((job, index) => (
              <tr key={index}>
                <td>{job._id}</td>
                <td>{job.title}</td>
                <td>{job.salary}</td>
                {/* <td>{job.description}</td> */}
                <td>{job.openings}</td>
                <td>{job.experience}</td>
                <td>{job.address}</td>
                <td>{job.level}</td>
                <td>{job.emptype}</td>
                <td>{new Date(job.expiryDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(job._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <span style={{ color: "green" }}>{success}</span>
      </div>
    </div>
  );
};

export default CreatedJobs;
