import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = (props) => {
  return (
    <ul className="navbar">
      <div className="navbar__header">
        <h2>Zorber</h2>
      </div>
      <li className="navbar__item active">
        <Link className="navbar__link" to="/upcoming">
          Find a Race
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/create">
          Create a Race
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/past">
          Past Races
        </Link>
      </li>
      <li className="navbar__item">
        <Link
          className="navbar__link"
          to="/login"
          onClick={() => localStorage.removeItem("zorber_user")}
        >
          Logout
        </Link>
      </li>
    </ul>
  );
};
