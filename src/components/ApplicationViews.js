import React from "react";
import { Route } from "react-router-dom";
import { EventList } from "./events/EventList";
import { NewEventForm } from "./events/NewEventForm";
import { EventProvider } from "./events/EventProvider";
import { UserProvider } from "./users/UserProvider";
import { UserEventsProvider } from "./userEvents/UserEventsProvider";

export const ApplicationViews = () => {
  return (
    <>
      <EventProvider>
        <UserProvider>
          <UserEventsProvider>
            {/* HOME / UPCOMING */}
            <Route exact path="/upcoming">
              <EventList />
            </Route>

            <Route exact path="/create">
              <NewEventForm />
            </Route>

            {/* <Route exact path ="/users">

          </Route> */}
          </UserEventsProvider>
        </UserProvider>
      </EventProvider>
    </>
  );
};
