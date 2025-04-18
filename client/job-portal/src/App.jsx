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
import { useState } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import CreateJobs from "./Components/CreateJobs";

function App() {
  const [isOver, setIsOver] = useState(false);
  const [fullname, setFullname] = useState(
    localStorage.getItem("fullname") || ""
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [id, setId] = useState(localStorage.getItem("_id") || "");
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
            />
          }
        />
        <Route path="/aboutus" element={<AboutUs />} />

        {/* registers/logins */}
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
            />
          }
        />
        {/* admin */}
        <Route path="/admin" element={<Admin />}>
          <Route path="users" element={<Users />} />
          <Route path="companies" element={<Companies />} />
        </Route>

        {/* dashboard users */}
        <Route path="/dashboard" element={<Dashboard fullname={fullname} />}>
          <Route
            path="createjobs"
            element={<CreateJobs fullname={fullname} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
