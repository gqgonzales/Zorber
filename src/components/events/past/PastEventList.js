import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "../EventProvider";
import { UserContext } from "../../users/UserProvider";
import { UserEventsContext } from "../../userEvents/UserEventsProvider";
import { PastEventDetail } from "./PastEventDetail";
import { EventSearch } from "../EventSearch";
import "../Event.css";

export const PastEventList = () => {
  const { events, getEvents, searchTerms } = useContext(EventContext);
  const { getUsers } = useContext(UserContext);
  const { getUserEvents } = useContext(UserEventsContext);

  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, run the dateFilter to find upcoming events
      // Then .sort() to put them in the correct order
      // And finally, .filter() again to check title against search terms
      const dateFilter = events.filter((event) => {
        if (Date.parse(event.date) < Date.now()) {
          return true;
        }
      });
      const searchSort = dateFilter.sort(
        (a, b) => Date.parse(b.date) - Date.parse(a.date)
      );
      const subset = searchSort.filter(
        (event) =>
          event.title.includes(searchTerms) ||
          event.title.toLowerCase().includes(searchTerms) ||
          event.title.toUpperCase().includes(searchTerms)
      );
      setFilteredEvents(subset);
    } else {
      // If the search field is blank, run the dateFilter to find upcoming events
      // Then .sort() to put them in the correct order
      const dateFilter = events.filter((event) => {
        if (Date.parse(event.date) < Date.now()) {
          return true;
        }
      });
      const sorted = dateFilter.sort(
        (a, b) => Date.parse(b.date) - Date.parse(a.date)
      );
      setFilteredEvents(sorted);
    }
  }, [searchTerms, events]);

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
      <div className="search__input">
        <EventSearch />
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
