import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../Css/AppliedJobs.css";
import { fetchApplicants } from "../services/getApplicants";
import { NavLink } from "react-router-dom";

const Applicants = ({ isSelected, setIsSelected }) => {
  const { _id: companyId, fullname } = useSelector((state) => state.user);
  const [applicantsData, setApplicantsData] = useState([]);
  const [error, setError] = useState();

  console.log(companyId);

  useEffect(() => {
    fetchApplicants(companyId)
      .then((applicants) => {
        setApplicantsData(Array.isArray(applicants) ? applicants : []);
        // console.log(applicantsData);
      })
      .catch((err) => {
        setError("Error fetching applications");
      });
  }, [companyId]);

  //opens resume in new tab
  const viewResume = (resume) => {
    window.open(`http://localhost:3001/uploads/${resume}`, "_blank");
  };

  return (
    <div>
      <h1>{fullname}'s job applicants</h1>
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
              <th>Resume</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicantsData.map((applicants, index) => (
              <tr key={index}>
                <td>{applicants.jobId?.title}</td>
                <td>{applicants.userId?.fullname} </td>
                <td>{applicants.userId?.address}</td>
                <td>{applicants.userId?.email}</td>
                <td>
                  {new Date(applicants?.appliedAt).toISOString().split("T")[0]}
                </td>
                <td>
                  <button
                    className="resume-btn"
                    onClick={() => viewResume(applicants.userId?.resume)}
                  >
                    View Resume
                  </button>
                </td>
                <td>
                  <button
                    className="shortlist"
                    onClick={() => setIsSelected("shortlisted")}
                  >
                    Shortlist
                  </button>
                </td>
                <td>
                  <button
                    className="reject"
                    onClick={() => setIsSelected("rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {console.log(isSelected)}
      </div>
    </div>
  );
};

export default Applicants;
