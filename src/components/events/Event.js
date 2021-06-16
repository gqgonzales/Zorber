import React from "react";
import "./Event.css";
import { Link } from "react-router-dom";

export const event = ({ eventObj }) => (
  <section className="event">
    <Link to={`/events/${eventObj.id}`}>
      <h3 className="event__title">{eventObj.title}</h3>
    </Link>
    <div className="event__location">{eventObj.location}</div>
  </section>
);
