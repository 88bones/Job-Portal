import React from "react";
import "../Css/Cards.css";
import { NavLink } from "react-router-dom";

const Cards = () => {
  const Cards = [
    {
      name: "For Candidate",
      info: "Unlock endless opportunities and connect with top employers. Let your skills shine and land your dream job.",
      img: "/",
      button: "Upload your CV",
      path: "/cv",
    },
    {
      name: "For Employers",
      info: "Access a pool of skilled candidates and streamline your hiring process. Find the best talent for your company's success",
      img: "/",
      button: "Start Hiring",
      path: "/",
    },
  ];
  return (
    <div className="card-container">
      <div className="card-holder">
        {Cards.map((card, index) => (
          <div className={`card-sub-container card-${index}`} key={index}>
            <h3>{card.name}</h3>
            <p>{card.info}</p>
            <div className="card-btn" key={index}>
              <button>
                <NavLink to={card.path}>{card.button}</NavLink>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Cards;
