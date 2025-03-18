import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import AboutUs from "./Pages/AboutUs";
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
import Register from "./Components/Register";
import Users from "./Components/Users";

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />

        {/* admin */}
        <Route path="/admin" element={<Admin />}>
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
