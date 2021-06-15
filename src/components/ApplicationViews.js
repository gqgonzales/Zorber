import React from "react";
import { Route } from "react-router-dom";
import { RaceList } from "./races/RaceList";
import { RaceProvider } from "./races/RaceProvider";

export const ApplicationViews = () => {
  return (
    <>
      <RaceProvider>
        {/* HOME / UPCOMING */}
        <Route exact path="/upcoming">
          <RaceList />
        </Route>
      </RaceProvider>
    </>
  );
};
