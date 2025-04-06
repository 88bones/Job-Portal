import React from "react";
import Banner from "../Components/Banner.jsx";
import NavBar from "../Components/NavBar.jsx";
import Cards from "../Components/Cards.jsx";

const Home = ({ isOver, setIsOver, fullname, setFullname }) => {
  return (
    <div>
      <NavBar
        isOver={isOver}
        setIsOver={setIsOver}
        fullname={fullname}
        setFullname={setFullname}
      />
      <Banner isOver={isOver} />
      <Cards />
    </div>
  );
};

export default Home;
