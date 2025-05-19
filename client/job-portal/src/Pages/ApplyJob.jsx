import NavBar from "../Components/NavBar";
import JobCard from "../Components/JobCard";

const ApplyJob = ({
  isOver,
  setIsOver,
  fullname,
  setFullname,
  role,
  setRole,
  loggedIn,
  setIsLoggedIn,
}) => {
  return (
    <div className="apply-job-container">
      <NavBar
        isOver={isOver}
        setIsOver={setIsOver}
        fullname={fullname}
        setFullname={setFullname}
        setRole={setRole}
        role={role}
        loggedIn={loggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="job-display-container">
        <JobCard />
      </div>
    </div>
  );
};

export default ApplyJob;
