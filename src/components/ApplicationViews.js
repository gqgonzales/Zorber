import React from "react";
import { Route } from "react-router-dom";
//
import { EventProvider } from "./events/EventProvider";
import { UserProvider } from "./users/UserProvider";
import { UserEventsProvider } from "./userEvents/UserEventsProvider";
//
import { UpcomingEventList } from "./events/upcoming/UpcomingEventList";
import { EditUpcomingEventForm } from "./events/upcoming/EditUpcomingEventForm";
//
import { NewEventForm } from "./events/NewEventForm";
//
import { PastEventList } from "./events/past/PastEventList";
import { EditPastEventForm } from "./events/past/EditPastEventForm";
//
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
