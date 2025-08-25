import React, { useEffect, useState } from "react";
import "../Css/Users.css";
import { fetchJobListings } from "../services/getJobListings";

const JobsDash = () => {
  const [listOfJobs, setListOfJobs] = useState([]);

  useEffect(() => {
    fetchJobListings()
      .then((data) => {
        setListOfJobs(data);
        console.log(data);
      })
      .catch((error) => console.log("Error fetching jobs: ", error));
  }, []);
  return (
    <div className="users-container">
      <header className="user-header">Jobs</header>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Companyname</th>
            <th>Industry</th>
            <th>salary</th>
            <th>Type</th>
            <th>Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listOfJobs.map((job, index) => (
            <tr key={index}>
              <td>{job.title}</td>
              <td>{job.postedBy?.companyname}</td>
              <td>{job.postedBy?.industry}</td>
              <td>{job.salary}</td>
              <td>{job.emptype}</td>
              <td>{job.experience}</td>
              <td className="action">
                <button onClick={() => handleDelete(job._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsDash;
