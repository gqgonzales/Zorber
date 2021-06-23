import React, { useContext, useEffect } from "react";
// To start, you need to import the context object you created in the provider component so that the useContext() hook can access the objects it exposes.
import "./Event.css";
import { useHistory } from "react-router-dom";
import { EventContext } from "./EventProvider";
import { UserContext } from "../users/UserProvider";
import { UserEventsContext } from "../userEvents/UserEventsProvider";

export const PastEventList = () => {
  // This state changes when `getEvents()` is invoked below
  const { events, getEvents } = useContext(EventContext);
  const { getUsers } = useContext(UserContext);
  const { userEvents, getUserEvents } = useContext(
    UserEventsContext
  );
  const history = useHistory();
  let filteredEvents = [];
  let eventParticipants = [];
  //useEffect - reach out to the world for something
  useEffect(() => {
    getEvents().then(getUsers()).then(getUserEvents());
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
                    Participants here
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
                  <div>!!! Finish times go here !!!</div>
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

// TIME CONVERTED BELOW
// https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no

// var timeString = "15:00";
// var H = +timeString.substr(0, 2);
// var h = H % 12 || 12;
// var ampm = H < 12 ? "AM" : "PM";
// timeString = h + timeString.substr(2, 3) + " " + ampm;
// document.write(timeString);
