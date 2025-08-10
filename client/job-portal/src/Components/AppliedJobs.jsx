import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchAppliedJobs } from "../services/getAppliedJobs";
import "../Css/AppliedJobs.css";

const AppliedJobs = () => {
  const { _id: userId, fullname } = useSelector((state) => state.user);
  const [applicationData, setApplicationData] = useState([]);
  const [error, setError] = useState();

  // console.log(userId);

  useEffect(() => {
    fetchAppliedJobs(userId)
      .then((application) => {
        setApplicationData(Array.isArray(application) ? application : []);
      })
      .catch((err) => {
        setError("Error fetching application");
      });
  }, [userId]);

  return (
    <div>
      <h1>{fullname}'s job applications</h1>
      {error && (
        <div
          className="error-message"
          style={{ color: "red", padding: "10px" }}
        >
          <p>{error}</p>
        </div>
      )}
      <div className="jobs-table">
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Email</th>
              <th>Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {applicationData.map((application, index) => (
              <tr key={index}>
                <td>{application.jobId?.title}</td>
                <td>{application.jobId?.postedBy?.companyname} </td>
                <td>{application.jobId?.address}</td>
                <td>{application.jobId?.postedBy?.email}</td>
                <td>
                  {new Date(application?.appliedAt).toISOString().split("T")[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJobs;
