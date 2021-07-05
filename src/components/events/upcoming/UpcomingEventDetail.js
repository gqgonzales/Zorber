import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
// import { EventContext } from "./EventProvider";
import { UserContext } from "../../users/UserProvider";
// import { UserEventsContext } from "../userEvents/UserEventsProvider";
import "../Event.css";
export const UpcomingEventDetail = ({ eventObj }) => {
  const {
    title,
    id,
    location,
    comments,
    startTime,
    date,
    userEvents,
  } = eventObj;

  const history = useHistory();
  const { users } = useContext(UserContext);

  const getUserById = (userId) => {
    const participant = users.filter((user) => {
      return user.id === userId;
    });

    return participant[0];
  };

  if (
    parseInt(localStorage.getItem("zorber_user")) ===
    eventObj.userId
  ) {
    return (
      <div
        className="event"
        id={`event--${eventObj.id}`}
        key={`event--${eventObj.id}`}
      >
        <div className="event__title option__name">
          <h3>{title}</h3>
        </div>
        <div className="event__info">
          <div className="event__location">
            {"📍 "}
            {location}
          </div>
          <div className="event__date event__startTime">
            {"🗓 "} {date} at {startTime}
          </div>
          <div className="event__comments">{comments}</div>
          <div className="event__author">
            Posted by{" "}
            {users.map((user) => {
              if (user.id === eventObj.userId) {
                return user.name;
              }
            })}
          </div>
          {/* EXPECTED ATTENDEES */}
          <div className="event__participants">
            <b>Expected attendees:</b>{" "}
            {userEvents.map((userEvent) => {
              return (
                <div
                  className="event__participant"
                  key={`event__participant--${id}`}
                >
                  {"– "}
                  {getUserById(userEvent.userId).name}
                </div>
              );
            })}
          </div>
        </div>
        {/* BUTTONS */}
        <div className="button_group">
          <button
            className="button button__edit"
            onClick={() => {
              history.push(`/upcoming/edit/${id}`);
            }}
          >
            {" ✍️ "}
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="event"
        id={`event--${id}`}
        key={`event--${id}`}
      >
        <div className="event__title option__name">
          <h3>{title}</h3>
        </div>
        <div className="event__info">
          <div className="event__location">
            {"📍 "}
            {location}
          </div>
          <div className="event__date event__startTime">
            {"🗓 "} {date} at {startTime}
          </div>
          <div className="event__comments">{comments}</div>
          {/* POST AUTHOR / CREATOR */}
          <div className="event__author">
            Posted by{" "}
            {users.map((user) => {
              if (user.id === eventObj.userId) {
                return user.name;
              }
            })}
          </div>
          {/* EXPECTED ATTENDEES */}
          <div className="event__participants">
            <b>Expected attendees:</b>{" "}
            {userEvents.map((userEvent) => {
              return (
                <div
                  className="event__participant"
                  key={`event__participant--${userEvent.id}`}
                >
                  {"– "}
                  {getUserById(userEvent.userId).name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};
