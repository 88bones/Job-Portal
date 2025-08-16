import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import AboutUs from "./Pages/AboutUs";
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
import Register from "./Components/Register";
import Users from "./Components/Users";
import Recruiter from "./Components/Recruiter";
import Companies from "./Components/Companies";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import CreateJobs from "./Components/CreateJobs";
import UpdateUsers from "./Components/UpdateUsers";
import CreatedJobs from "./Components/CreatedJobs";
import ApplyJob from "./Pages/ApplyJob";
import AppliedJobs from "./Components/AppliedJobs";
import Applicants from "./Components/Applicants";

function App() {
  const { fullname, role, _id, loggedIn } = useSelector((state) => state.user);
  const [isOver, setIsOver] = useState(false);


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home isOver={isOver} setIsOver={setIsOver} />}
        />
        <Route
          path="/jobs"
          element={
            <Jobs
              isOver={isOver}
              setIsOver={setIsOver}
              fullname={fullname}
              role={role}
              loggedIn={loggedIn}
            />
          }
        />
        <Route path="/aboutus" element={<AboutUs />} />

        {/* Apply Job */}
        <Route
          path="/applyJob/:_id"
          element={
            <ApplyJob
              _id={_id}
              isOver={isOver}
              setIsOver={setIsOver}
              fullname={fullname}
              role={role}
              loggedIn={loggedIn}
            />
          }
        />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter" element={<Recruiter />} />
        <Route path="/login" element={<Login />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin loggedIn={loggedIn} />}>
          <Route path="users" element={<Users />} />
          <Route path="companies" element={<Companies />} />
        </Route>

        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route
            path="createjobs"
            element={<CreateJobs fullname={fullname} />}
          />
          <Route
            path="createdJobs"
            element={<CreatedJobs _id={_id} fullname={fullname} />}
          />
          <Route path="updateUsers" element={<UpdateUsers />} />
          <Route path="appliedJobs" element={<AppliedJobs />} />
          <Route path="applicants" element={<Applicants />} />
        </Route>
        <Route path="cv" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
