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

function App() {
  const [isOver, setIsOver] = useState(false);
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route
          path="/"
          element={<Home isOver={isOver} setIsOver={setIsOver} />}
        />
        <Route
          path="/jobs"
          element={<Jobs isOver={isOver} setIsOver={setIsOver} />}
        />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter" element={<Recruiter />} />

        {/* admin */}
        <Route path="/admin" element={<Admin />}>
          <Route path="users" element={<Users />} />
          <Route path="companies" element={<Companies />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
