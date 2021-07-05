import React, { useContext, useEffect, useState } from "react";
// To start, you need to import the context object you created in the provider component so that the useContext() hook can access the objects it exposes.
import "../Event.css";
// import { useHistory } from "react-router-dom";
import { EventContext } from "../EventProvider";
import { UserContext } from "../../users/UserProvider";
import { UserEventsContext } from "../../userEvents/UserEventsProvider";
import { PastEventDetail } from "./PastEventDetail";
// import userEvent from "@testing-library/user-event";

export const PastEventList = () => {
  // This state changes when `getEvents()` is invoked below
  const { events, getEvents } = useContext(EventContext);
  const { getUsers } = useContext(UserContext);
  const { getUserEvents } = useContext(UserEventsContext);

  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const dateFilter = events.filter((event) => {
      if (Date.parse(event.date) < Date.now()) {
        return true;
      }
    });
    const sorted = dateFilter.sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );
    // console.log("TAG", sorted);
    setFilteredEvents(sorted);
  }, [events]);
  // console.log(filteredEvents);

  //useEffect - reach out to the world for something
  useEffect(() => {
    getUsers().then(getEvents).then(getUserEvents);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //   The empty array bracket is the dependency array. It only runs on first render.

  return (
    <>
      <div className="subsection__header__container">
        <h2 className="subsection__header eventForm__title">Past Events</h2>
      </div>
      <div
        className="event__container"
        //   YOU ONLY NEED THIS CONTAINER FOR CSS PURPOSES
      >
        {filteredEvents.map((eventObj) => {
          // console.log(eventObj);
          return <PastEventDetail eventObj={eventObj} />;
        })}
      </div>
    </>
  );
};
// eslint-disable-next-line no-undef
