import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserEventsContext } from "../userEvents/UserEventsProvider";
import { EventContext } from "./EventProvider";
import { UserContext } from "../users/UserProvider";

export const EventDetail = ({ eventObj }) => {
  //   console.log(eventObj);
  const {
    title,
    id,
    location,
    comments,
    startTime,
    date,
    userEvents,
  } = eventObj;

  console.log(eventObj);
  //   //   if (!eventObj) {
  //   //     console.error("No object");
  //   //     return <div></div>;
  //   //   }
  const history = useHistory();

  const { getEvents } = useContext(EventContext);
  const { users } = useContext(UserContext);

  //   console.log(users);

  //   const { userEvents, getUserEvents, getUserEventsById } =
  //     useContext(UserEventsContext);

  //   useEffect(() => {
  //     getEvents().then(getUsers).then(getUserEvents);
  //   }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //   const [participants, setParticipants] = useState([]);

  //   //   useEffect(() => {
  //   //     getUserEventsById(eventObj.id).then((res) => {
  //   //       setParticipants(res);
  //   //     });
  //   //   }, []);
  //   //   console.log(participants);
  const getUserById = (id) => {
    const participant = users.filter((user) => {
      return user.id === id;
    });
    // console.log(participant);

    return participant[0];
  };
  // console.log(getUserById())
  //   //   console.log(eventObj);

  //   const userIds = userEvents.map((userEvent) => {
  //     return userEvent.id;
  //   });

  //   let participants = getUsersByIds(id);

  return (
    <div
      className="event"
      //   YOU ONLY NEED THIS CONTAINER FOR CSS
    >
      <div className="event__card" id={`event--${id}`}>
        <div className="event__title option__name">
          <h3>{title}</h3>
        </div>
        <div className="event__info">
          <h4 className="event__location">{location}</h4>
          <div className="event__date event__startTime">
            {date} at {startTime}
          </div>
          <div className="event__comments">{comments}</div>
          {userEvents.map((userEvent) => {
            console.log(userEvent);
            return (
              <div className="event__participant">
                {getUserById(userEvent.userId).name}
              </div>
            );
          })}
        </div>
        <div className="button_group">
          <button
            className="btn"
            onClick={() => {
              history.push(`/past/edit/${id}`);
            }}
          >
            Edit Event
          </button>
        </div>
      </div>
    </div>
  );
};
