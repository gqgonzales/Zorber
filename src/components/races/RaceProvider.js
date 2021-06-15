import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const RaceContext = createContext();

// This component establishes what data can be used.
export const RaceProvider = (props) => {
  const [races, setRaces] = useState([]);

  const getRaces = () => {
    return fetch("http://localhost:8088/races")
      .then((res) => res.json())
      .then((data) => setRaces(data));
  };

  const addRace = (raceObject) => {
    return fetch("http://localhost:8088/races", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raceObject),
    }).then(getRaces);
  };

  return (
    <RaceContext.Provider
      value={{
        races,
        getRaces,
        addRace,
      }}
    >
      {props.children}
    </RaceContext.Provider>
  );
};
