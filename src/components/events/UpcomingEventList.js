import React, { useContext, useEffect, useState } from "react";
// To start, you need to import the context object you created in the provider component so that the useContext() hook can access the objects it exposes.
import "./Event.css";
import { useHistory } from "react-router-dom";
import { EventContext } from "./EventProvider";
import { UserContext } from "../users/UserProvider";
import { UserEventsContext } from "../userEvents/UserEventsProvider";

export const UpcomingEventList = () => {
  // This state changes when `getEvents()` is invoked below
  const { events, getEvents } = useContext(EventContext);
  const { users, getUsers } = useContext(UserContext);
  const { userEvents, getUserEvents } = useContext(
    UserEventsContext
  );

  const history = useHistory();

  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const dateFilter = events.filter((event) => {
      if (Date.parse(event.date) > Date.now()) {
        return true;
      }
    });
    setFilteredEvents(dateFilter);
  }, [events]);

  const host = filteredEvents.forEach((event) => {
    users.forEach((user) => {
      if (event.userId === user.id) {
        return user.name;
      }
    });
  });

  // let allEvents = events.map((event) => {
  //   return { event };
  // });

  // console.log(allEvents);

  // const host = users.forEach((user) => {
  //   if (user.id === events.userId) {
  //     return user.name;
  //   }
  // });

  //useEffect - reach out to the world for something
  useEffect(() => {
    getEvents().then(getUsers).then(getUserEvents);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="subsection__header__container">
        <h2 className="subsection__header">Upcoming Events</h2>
      </div>
      <div className="Events">
        {/* {events.forEach((eventObj) => {
          if (Date.parse(eventObj.date) > Date.now()) {
            filteredEvents.push(eventObj);
          }
          return { filteredEvents };
        })} */}

        {filteredEvents.map((eventObj) => {
          return (
            <div
              className="event"
              id={`event--${eventObj.id}`}
              key={`event--${eventObj.id}`}
            >
              <div className="event__title option__name">
                <h3>{eventObj.title}</h3>
              </div>
              <div className="event__info">
                <h4 className="event__location">
                  {eventObj.location}
                </h4>
                {/* HOW CAN WE CONVERT THIS USERID TO THE APPROPRIATE NAME? */}
                <div>
                  Hosted by{" "}
                  {users.map((user) => {
                    if (user.id === eventObj.userId) {
                      return user.name;
                    }
                  })}
                </div>
                <div className="event__date event__startTime">
                  {eventObj.date} at {eventObj.startTime}
                </div>
                <div className="event__comments">
                  {eventObj.comments}
                </div>
              </div>
              {/* BUTTONS */}
              <div className="button_group">
                <button
                  className="btn"
                  onClick={() => {
                    history.push(
                      `/upcoming/edit/${eventObj.id}`
                    );
                  }}
                >
                  Edit Event
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
