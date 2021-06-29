import React, { useContext, useEffect, useState } from "react";
// To start, you need to import the context object you created in the provider component so that the useContext() hook can access the objects it exposes.
import "./Event.css";
// import { useHistory } from "react-router-dom";
import { EventContext } from "./EventProvider";
import { UserContext } from "../users/UserProvider";
import { UserEventsContext } from "../userEvents/UserEventsProvider";
import { UpcomingEventDetail } from "./UpcomingEventDetail";
// import userEvent from "@testing-library/user-event";

export const CompactUpcomingEventList = () => {
  // This state changes when `getEvents()` is invoked below
  const { events, getEvents } = useContext(EventContext);
  const { getUsers } = useContext(UserContext);
  const { getUserEvents } = useContext(UserEventsContext);

  // const [userEvents, setstate] = useState({})

  //   const history = useHistory();

  //   // This is our ORIGINAL copy of the userEvents associated with this event.
  //   const [originalParticipants, setOriginalParticipants] =
  //     useState([]);

  //   // This is the dynamic copy of the userEvents that is updated by our changes.
  //   const [participants, setParticipants] = useState([]);

  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const dateFilter = events.filter((event) => {
      if (Date.parse(event.date) > Date.now()) {
        return true;
      }
    });
    const sorted = dateFilter.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
    console.log("TAG", sorted);
    setFilteredEvents(sorted);
  }, [events]);
  // console.log(filteredEvents);

  //useEffect - reach out to the world for something
  useEffect(() => {
    getUsers().then(getEvents).then(getUserEvents);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="subsection__header__container">
        <h2 className="subsection__header">Upcoming Events</h2>
      </div>
      <div
        className="event__container"
        //   YOU ONLY NEED THIS CONTAINER FOR CSS PURPOSES
      >
        {filteredEvents.map((eventObj) => {
          // console.log(eventObj);
          return <UpcomingEventDetail eventObj={eventObj} />;
        })}
      </div>
    </>
  );
};
