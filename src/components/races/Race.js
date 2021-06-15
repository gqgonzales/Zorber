import React from "react";
import "./Race.css";
import { Link } from "react-router-dom";

export const race = ({ raceObj }) => (
  <section className="race">
    <Link to={`/races/${raceObj.id}`}>
      <h3 className="race__title">{raceObj.title}</h3>
    </Link>
    <div className="race__location">{raceObj.location}</div>
  </section>
);
