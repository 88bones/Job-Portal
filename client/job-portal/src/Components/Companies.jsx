import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/Users.css";

const Companies = () => {
  const tableHeads = [
    "Company Name",
    "Industry",
    "Email",
    "Phone",
    "Address",
    "Action",
  ];
  const [listOfRecruiters, setListOfRecruiters] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/recruiters/getRecruiters")
      .then((response) => {
        setListOfRecruiters(response.data);
      })
      .catch((error) => console.log("Error fetching users: ", error));
    setError(error);
  }, []);

  const filteredIndustry =
    selectedIndustry && selectedIndustry !== "all"
      ? listOfRecruiters.filter(
          (recruiter) => recruiter.industry === selectedIndustry
        )
      : listOfRecruiters;

  return (
    <div className="users-container">
      <header className="user-header">Recruiters</header>
      <div className="filter-container">
        <select
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
        >
          <option value="all">All</option>
          <option value="it">Information Technology</option>
          <option value="mgm">Management</option>
          <option value="er">Engineering</option>
          <option value="med">Medical</option>
        </select>
        <table>
          <thead>
            <tr>
              {tableHeads.map((head, index) => (
                <th key={index}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredIndustry.map((recruiter, index) => (
              <tr key={index}>
                <td>{recruiter.companyname}</td>
                <td>{recruiter.industry}</td>
                <td>{recruiter.email}</td>
                <td>{recruiter.phone}</td>
                <td>{recruiter.address}</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          {error && <span>{error}</span>}
        </table>
      </div>
    </div>
  );
};

export default Companies;
