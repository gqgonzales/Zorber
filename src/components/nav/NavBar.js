import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = (props) => {
  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/upcomingRaces">
          Find a Race
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/createRace">
          Create a Race
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/pastRaces">
          Past Races
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/login">
          Logout
        </Link>
      </li>
    </ul>
  );
};
