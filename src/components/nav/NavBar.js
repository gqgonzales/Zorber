import React from "react";
import { Link, useHistory } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import "./NavBar.css";

export const NavBar = (props) => {
  const history = useHistory();

  return (
    <ul className="navbar">
      <div className="navbar__header">
        <h2>Zorber</h2>
      </div>
      <li className="navbar__item active">
        <button
          type="button"
          className="btn btn-secondary btn-circle btn-md"
          onClick={() => history.push("/upcoming")}
        >
          Find Races
        </button>
        {/* OLD BELOW */}
        {/* <Link className="navbar__link" to="/upcoming">
          Find a Race
        </Link> */}
      </li>
      <li className="navbar__item">
        <button
          type="button"
          className="btn btn-secondary btn-circle btn-md"
          onClick={() => history.push("/create")}
        >
          Create New
        </button>
        {/* OLD BELOW */}
        {/* <Link className="navbar__link" to="/create">
          Create a Race
        </Link> */}
      </li>
      <li className="navbar__item">
        <button
          type="button"
          className="btn btn-secondary btn-circle btn-md"
          onClick={() => history.push("/past")}
        >
          Past Races
        </button>
        {/* OLD BELOW */}
        {/* <Link className="navbar__link" to="/past">
          Past Races
        </Link> */}
      </li>
      <li className="navbar__item">
        <Link
          className="navbar__link btn btn-secondary btn-circle btn-md"
          to="/login"
          onClick={() => localStorage.removeItem("zorber_user")}
        >
          Logout
        </Link>
      </li>
    </ul>
  );
};
