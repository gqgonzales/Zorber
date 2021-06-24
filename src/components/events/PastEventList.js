import React, { useContext, useEffect, useState } from "react";
// To start, you need to import the context object you created in the provider component so that the useContext() hook can access the objects it exposes.
import "./Event.css";
import { useHistory } from "react-router-dom";
import { EventContext } from "./EventProvider";
import { UserContext } from "../users/UserProvider";
import { UserEventsContext } from "../userEvents/UserEventsProvider";
import { EventDetail } from "../events/EventDetail";
// import userEvent from "@testing-library/user-event";

export const PastEventList = () => {
  // This state changes when `getEvents()` is invoked below
  const { events, getEvents } = useContext(EventContext);
  const { users, getUsers } = useContext(UserContext);
  const { userEvents, getUserEvents, getUserEventsById } =
    useContext(UserEventsContext);

  // const [userEvents, setstate] = useState({})

  const history = useHistory();

  // This is our ORIGINAL copy of the userEvents associated with this event.
  const [originalParticipants, setOriginalParticipants] =
    useState([]);

  // This is the dynamic copy of the userEvents that is updated by our changes.
  const [participants, setParticipants] = useState([]);

  const [filteredEvents, setFilteredEvents] = useState([]);

  //useEffect - reach out to the world for something
  useEffect(() => {
    getEvents().then(getUsers).then(getUserEvents);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //   The empty array bracket is the dependency array. It only runs on first render.

  useEffect(() => {
    const dateFilter = events.filter((event) => {
      if (Date.parse(event.date) < Date.now()) {
        return true;
      }
    });
    setFilteredEvents(dateFilter);
  }, [events]);
  // console.log(filteredEvents);

  // const participantFilter = [];
  // useEffect(() => {
  //   for (const participant of userEvents) {
  //     users.forEach((user) => {
  //       if (participant.userId === user.id) {
  //         participantFilter.push(user);
  //       }
  //     });
  //   }
  //   console.log(participantFilter);
  //   setParticipants(participantFilter);
  // }, [userEvents]);

  return (
    <>
      <div className="subsection__header__container">
        <h2 className="subsection__header">Past Events</h2>
      </div>
      {filteredEvents.map((eventObj) => {
        // console.log(filteredEvents);
        return <EventDetail eventObj={eventObj} />;
      })}
    </>
  );
};

/* {events.forEach((event) => {
                      if (
                        event.id === event.userEvents.eventId
                      ) {
                        eventParticipants.push(
                          event.userEvents.userId
                        );
                      }
                      return { eventParticipants };
                    })} */

/* {events.map((event) => {
          return (
            <div
              className="event"
              id={`event--${event.id}`}
              key={`event--${event.id}`}
            >
              <div className="event__title option__name">
                <h3>{event.title}</h3>
              </div>
              <div className="event__info">
                <h4 className="event__location">
                  {event.location}
                </h4>
                <div className="event__date event__startTime">
                  {event.date} at {event.startTime}
                </div>
                <div className="event__comments">
                  {event.comments}
                </div>
              </div>
            </div>
          );
        })} */

// TIME CONVERTED BELOW
// https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no

// var timeString = "15:00";
// var H = +timeString.substr(0, 2);
// var h = H % 12 || 12;
// var ampm = H < 12 ? "AM" : "PM";
// timeString = h + timeString.substr(2, 3) + " " + ampm;
// document.write(timeString);
