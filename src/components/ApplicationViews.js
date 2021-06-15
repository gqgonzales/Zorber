import React from "react";
import { Route } from "react-router-dom";
import { RaceProvider } from "./races/RaceProvider";

export const ApplicationViews = () => {
  return (
    <>
      <RaceProvider>
        {/* HOME */}
        <Route exact path="/"></Route>
      </RaceProvider>
    </>
  );
};
