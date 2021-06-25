import React from "react";
import { Route } from "react-router-dom";
import { UpcomingEventList } from "./events/UpcomingEventList";
import { NewEventForm } from "./events/NewEventForm";
import { EventProvider } from "./events/EventProvider";
import { UserProvider } from "./users/UserProvider";
import { UserEventsProvider } from "./userEvents/UserEventsProvider";
import { PastEventList } from "./events/PastEventList";
import { EditPastEventForm } from "./events/EditPastEventForm";
import { EditUpcomingEventForm } from "./events/EditUpcomingEventForm";
// import { PastEventDetail } from "./events/PastEventDetail";

export const ApplicationViews = () => {
  return (
    <>
      <EventProvider>
        <UserProvider>
          <UserEventsProvider>
            {/* HOME / UPCOMING */}
            <Route exact path="/upcoming">
              <UpcomingEventList />
            </Route>

            <Route exact path="/upcoming/edit/:eventId(\d+)">
              <EditUpcomingEventForm />
            </Route>

            <Route exact path="/create">
              <NewEventForm />
            </Route>

            <Route exact path="/past">
              <PastEventList />
            </Route>

            <Route exact path="/past/edit/:eventId(\d+)">
              <EditPastEventForm />
            </Route>

            {/* <Route exact path ="/users">

          </Route> */}
          </UserEventsProvider>
        </UserProvider>
      </EventProvider>
    </>
  );
};
