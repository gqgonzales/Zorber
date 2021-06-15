import React, { useContext, useEffect } from "react";
// To start, you need to import the context object you created in the provider component so that the useContext() hook can access the objects it exposes.
import "./Location.css";
import { useHistory, Link } from "react-router-dom";
import { RaceContext } from "./RaceProvider";

export const LocationList = () => {
  // This state changes when `getLocations()` is invoked below
  const { races, getRaces } = useContext(RaceContext);
  const history = useHistory();

  //useEffect - reach out to the world for something
  useEffect(() => {
    getRaces();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //   The empty array bracket is the dependency array. It only runs on first render.

  return (
    <>
      <h2>Find a Race</h2>
    </>
  );
};
