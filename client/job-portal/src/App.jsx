import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import AboutUs from "./Pages/AboutUs";
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
import Register from "./Components/Register";
import Users from "./Components/Users";
import Recruiter from "./Components/Recruiter";
import Companies from "./Components/Companies";
import { useEffect, useState } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import CreateJobs from "./Components/CreateJobs";
import UpdateUsers from "./Components/UpdateUsers";
import CreatedJobs from "./Components/CreatedJobs";
import ApplyJob from "./Pages/ApplyJob";

function App() {
  const [isOver, setIsOver] = useState(false);
  const [fullname, setFullname] = useState(
    localStorage.getItem("fullname") || ""
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [_id, setId] = useState(localStorage.getItem("_id") || "");

  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isOver={isOver}
              setIsOver={setIsOver}
              fullname={fullname}
              setFullname={setFullname}
              role={role}
              loggedIn={loggedIn}
              setIsLoggedIn={setIsLoggedIn}
              _id={_id}
              setId={setId}
            />
          }
        />
        <Route
          path="/jobs"
          element={
            <Jobs
              isOver={isOver}
              setIsOver={setIsOver}
              fullname={fullname}
              setFullname={setFullname}
              role={role}
              loggedIn={loggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="/aboutus" element={<AboutUs />} />

        {/* =============Apply JObs=============== */}
        <Route
          path="/applyJob/:_id"
          element={
            <ApplyJob
              _id={_id}
              isOver={isOver}
              setIsOver={setIsOver}
              fullname={fullname}
              setFullname={setFullname}
              setRole={setRole}
              role={role}
              loggedIn={loggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        {/*============== registers/logins =================*/}
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter" element={<Recruiter />} />
        <Route
          path="/login"
          element={
            <Login
              fullname={fullname}
              setFullname={setFullname}
              role={role}
              setRole={setRole}
              loggedIn={loggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        {/*================ admin==========*/}
        <Route path="/admin" element={<Admin loggedIn={loggedIn} />}>
          <Route path="users" element={<Users />} />
          <Route path="companies" element={<Companies />} />
        </Route>

        {/* =========dashboard users=========== */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              fullname={fullname}
              loggedIn={loggedIn}
              role={role}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        >
          {/* =============jobs ================*/}
          <Route
            path="createjobs"
            element={<CreateJobs fullname={fullname} />}
          />
          <Route
            path="createdJobs"
            element={<CreatedJobs _id={_id} fullname={fullname} />}
          />
          {/* ===========users============== */}
          <Route
            path="updateUsers"
            element={<UpdateUsers _id={_id} role={role} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
