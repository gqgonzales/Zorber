import React, { useContext, useEffect } from "react";
// To start, you need to import the context object you created in the provider component so that the useContext() hook can access the objects it exposes.
import "./Race.css";
// import { useHistory, Link } from "react-router-dom";
import { RaceContext } from "./RaceProvider";

export const RaceList = () => {
  // This state changes when `getRaces()` is invoked below
  const { races, getRaces } = useContext(RaceContext);
  // const history = useHistory();

  //useEffect - reach out to the world for something
  useEffect(() => {
    getRaces();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //   The empty array bracket is the dependency array. It only runs on first render.

  return (
    <>
      <div className="subsection__header__container">
        <h2 className="subsection__header">Upcoming Races</h2>
      </div>
      <div className="races">
        {races.map((race) => {
          return (
            <div
              className="race"
              id={`race--${race.id}`}
              key={`race--${race.id}`}
            >
              <div className="race__title option__name">
                <h3>{race.title}</h3>
              </div>
              <div className="race__info">
                <h4 className="race__location">
                  {race.location}
                </h4>
                <div className="race__date race__startTime">
                  {race.date} at {race.startTime}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
