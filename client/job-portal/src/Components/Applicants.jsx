import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../Css/AppliedJobs.css";
import { fetchApplicants } from "../services/getApplicants";
import { NavLink } from "react-router-dom";
import { updateStatus } from "../services/putApplicationStatus";
import { updateNotification } from "../services/postNotification";

const Applicants = () => {
  const { _id: companyId, fullname } = useSelector((state) => state.user);
  const [applicantsData, setApplicantsData] = useState([]);
  const [error, setError] = useState();
  const [success, setSucess] = useState();

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

  const handleStausChange = async (appId, status) => {
    try {
      //application status
      await updateStatus(appId, status);
      //update notification
      await updateNotification(appId, status);

      const updatedApplicants = applicantsData.map((app) =>
        app._id === appId ? { ...app, status } : app
      );
      setApplicantsData(updatedApplicants);
      //timeout for status
      setSucess("Status updated!");
      const timeout = setTimeout(() => {
        setSucess("");
      }, 2000);
      return () => clearTimeout(timeout);
    } catch (err) {
      //console.log("Status err:",err)
      setError("Error!!");
    }
  };

  return (
    <div>
      <h1>{fullname}'s job applicants</h1>

      <div className="jobs-table">
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Fullname</th>
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
                    onClick={() =>
                      handleStausChange(applicants._id, "shortlisted")
                    }
                  >
                    Shortlist
                  </button>
                </td>
                <td>
                  <button
                    className="reject"
                    onClick={() =>
                      handleStausChange(applicants._id, "rejected")
                    }
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        {error && (
          <div
            className="error-message"
            style={{ color: "red", padding: "10px" }}
          >
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="success-message">
            <span>{success}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;
