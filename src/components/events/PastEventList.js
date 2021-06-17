import React, { useContext, useEffect } from "react";
// To start, you need to import the context object you created in the provider component so that the useContext() hook can access the objects it exposes.
import "./Event.css";
import { useHistory, Link } from "react-router-dom";
import { EventContext } from "./EventProvider";
import { UserContext } from "../users/UserProvider";
// import { UserEventsProvider } from "../userEvents/UserEventsProvider";

export const PastEventList = () => {
  // This state changes when `getEvents()` is invoked below
  const { events, getEvents } = useContext(EventContext);
  const { users, getUsers } = useContext(UserContext);
  // const { userEvents, getUserEvents } = useContext(
  //   UserEventsProvider
  // );
  const history = useHistory();
  let filteredEvents = [];
  let eventParticipants = [];
  //useEffect - reach out to the world for something
  useEffect(() => {
    getEvents().then(getUsers);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //   The empty array bracket is the dependency array. It only runs on first render.

  return (
    <>
      <div className="subsection__header__container">
        <h2 className="subsection__header">Past Events</h2>
      </div>
      <div className="Events">
        {events.forEach((event) => {
          if (Date.parse(event.date) < Date.now()) {
            filteredEvents.push(event);
          }
          return { filteredEvents };
        })}

        {filteredEvents.map((event) => {
          // const humanReadableStartTime =
          //   event.startTime.toLocaleTimeString();
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
                <div className="event__participants">
                  <div>
                    {events.forEach((event) => {
                      if (
                        event.id === event.userEvents.eventId
                      ) {
                        eventParticipants.push(
                          event.userEvents.userId
                        );
                      }
                      return { eventParticipants };
                    })}
                  </div>
                </div>
                <div className="event__participants__time">
                  <div>!!! Time goes here !!!</div>
                </div>
                {/* PANIC ATTACKS */}
                <div className="button_group">
                  <button
                    className="btn"
                    onClick={() => {
                      history.push(`/past/edit/${event.id}`);
                    }}
                  >
                    Edit Event
                  </button>
                </div>
                {/* OLD BUTTON GOES HERE */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

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
