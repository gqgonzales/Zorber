import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserEventsContext } from "../userEvents/UserEventsProvider";
import { EventContext } from "./EventProvider";
import { UserContext } from "../users/UserProvider";

export const EventDetail = ({ eventObj }) => {
  console.log(eventObj);
  const history = useHistory();

  const { events, getEvents } = useContext(EventContext);
  const { getUsers } = useContext(UserContext);
  const { userEvents, getUserEvents, getUserEventsById } =
    useContext(UserEventsContext);

  useEffect(() => {
    getEvents().then(getUsers).then(getUserEvents);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [participants, setParticipants] = useState([]);

  //   useEffect(() => {
  //     getUserEventsById(eventObj.id).then((res) => {
  //       setParticipants(res);
  //     });
  //   }, []);

  //   console.log(participants);

  return (
    <>
      <div className="events__container">
        <div
          className="event"
          //   id={`eventObj--${eventObj.id}`}
          //   key={`eventObj--${eventObj.id}`}
        >
          <div className="event__title option__name">
            <h3>
              event title
              {/* {eventObj.title} */}
            </h3>
          </div>
          <div className="event__info">
            <h4 className="event__location">
              location
              {/* {eventObj.location} */}
            </h4>
            <div className="event__date event__startTime">
              date and time
              {/* {eventObj.date} at {eventObj.startTime} */}
            </div>
            <div className="event__comments">
              comments
              {/* {eventObj.comments} */}
            </div>
          </div>
          <div className="button_group">
            <button
              className="btn"
              onClick={() => {
                history.push(`/past/edit/${eventObj.id}`);
              }}
            >
              Edit Event
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
