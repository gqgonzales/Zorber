import React, { useContext, useEffect, useState } from "react";
// To start, you need to import the context object you created in the provider component so that the useContext() hook can access the objects it exposes.
import "./Event.css";
import { useHistory } from "react-router-dom";
import { EventContext } from "./EventProvider";
import { UserContext } from "../users/UserProvider";
import { UserEventsContext } from "../userEvents/UserEventsProvider";
import { PastEventDetail } from "./PastEventDetail";
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

  useEffect(() => {
    const dateFilter = events.filter((event) => {
      if (Date.parse(event.date) < Date.now()) {
        return true;
      }
    });
    const sorted = dateFilter.sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );
    console.log("TAG", sorted);
    setFilteredEvents(sorted);
  }, [events]);
  // console.log(filteredEvents);

  //useEffect - reach out to the world for something
  useEffect(() => {
    getUsers().then(getEvents).then(getUserEvents);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //   The empty array bracket is the dependency array. It only runs on first render.

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
