import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "../EventProvider";
import { UserContext } from "../../users/UserProvider";
import { UserEventsContext } from "../../userEvents/UserEventsProvider";
import { UpcomingEventDetail } from "./UpcomingEventDetail";
import { EventSearch } from "../EventSearch";
import "../Event.css";

export const UpcomingEventList = () => {
  const { events, getEvents, searchTerms } = useContext(EventContext);
  const { getUsers } = useContext(UserContext);
  const { getUserEvents } = useContext(UserEventsContext);

  const [filteredEvents, setFilteredEvents] = useState([]);

  //useEffect - reach out to the world for something
  useEffect(() => {
    getUsers().then(getEvents).then(getUserEvents);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, run the dateFilter to find upcoming events
      // Then .sort() to put them in the correct order
      // And finally, .filter() again to check title against search terms
      const dateFilter = events.filter((event) => {
        if (Date.parse(event.date) > Date.now()) {
          return true;
        }
      });
      const searchSort = dateFilter.sort(
        (a, b) => Date.parse(a.date) - Date.parse(b.date)
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
        if (Date.parse(event.date) > Date.now()) {
          return true;
        }
      });
      const sorted = dateFilter.sort(
        (a, b) => Date.parse(a.date) - Date.parse(b.date)
      );
      setFilteredEvents(sorted);
    }
  }, [searchTerms, events]);

  return (
    <>
      <div className="subsection__header__container">
        <h2 className="subsection__header eventForm__title">Upcoming Events</h2>
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
          return <UpcomingEventDetail eventObj={eventObj} />;
        })}
      </div>
    </>
  );
};
