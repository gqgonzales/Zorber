import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { EventContext } from "../EventProvider";
import { UserContext } from "../../users/UserProvider";
// import { UserEventsContext } from "../../userEvents/UserEventsProvider";
import "../Event.css";
import { TinyTimeForm } from "./TinyTimeForm";

export const PastEventDetail = ({ eventObj }) => {
  const {
    title,
    id,
    location,
    comments,
    startTime,
    date,
    userId,
    userEvents,
  } = eventObj;

  const history = useHistory();

  const { users } = useContext(UserContext);

  const getUserById = (id) => {
    const participant = users.filter((user) => {
      return user.id === id;
    });

    return participant[0];
  };

  const sortedUsers = [...userEvents].sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  // const updatedStartTime = { startTime };
  // updatedStartTime.toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  if (
    parseInt(localStorage.getItem("zorber_user")) ===
    eventObj.userId
  ) {
    return (
      <div
        className="event"
        id={`event--${id}`}
        key={`event--${id}`}
      >
        <div className="event__title__container option__name">
          <h3 className="event__title">{title}</h3>
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
          {/* <div className="event__author">
            Posted by{" "}
            <b>
              {users.map((user) => {
                if (user.id === userId) {
                  return user.name;
                }
              })}
            </b>
          </div> */}
          <div className="event__participants__label">
            <i>Participants:</i>
          </div>
          {sortedUsers.map((userEvent, index) => {
            var cls =
              index === 0
                ? "winner"
                : "event__participant__past";
            return (
              <>
                <div
                  className={cls}
                  key={`event__participant--${userEvent.id}`}
                >
                  {"– "}
                  {getUserById(userEvent.userId).name}, who
                  completed the course in {userEvent.time}
                  <br></br>
                  <TinyTimeForm
                    userEvent={userEvent}
                    eventObj={eventObj}
                  />
                </div>
              </>
            );
          })}
        </div>
        {/* BUTTONS */}
        <div className="button_group">
          <button
            className="button button__edit"
            onClick={() => {
              history.push(`/past/edit/${id}`);
            }}
          >
            {" ✍️ "}
          </button>
          <div className="event__author">
            Posted by{" "}
            <b>
              {users.map((user) => {
                if (user.id === userId) {
                  return user.name;
                }
              })}
            </b>
          </div>
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
        <div className="event__title__container option__name">
          <h3 className="event__title">{title}</h3>
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
          <div className="event__participants__label">
            <i>Participants:</i>
          </div>
          {sortedUsers.map((userEvent, index) => {
            var cls =
              index === 0
                ? "winner"
                : "event__participant__past";
            return (
              <>
                <div
                  className={cls}
                  key={`event__participant--${userEvent.id}`}
                >
                  {"– "}
                  {getUserById(userEvent.userId).name}, who
                  completed the course in {userEvent.time}
                  <br></br>
                  <TinyTimeForm
                    userEvent={userEvent}
                    eventObj={eventObj}
                  />
                </div>
              </>
            );
          })}
        </div>
        <div className="event__author">
          Posted by{" "}
          {users.map((user) => {
            if (user.id === userId) {
              return user.name;
            }
          })}
        </div>
      </div>
    );
  }
};

// TIME CONVERTED BELOW
// https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no

// var startTimeString = "15:00";
// var H = +startTimeString.substr(0, 2);
// var h = H % 12 || 12;
// var ampm = H < 12 ? "AM" : "PM";
// startTimeString = h + startTimeString.substr(2, 3) + " " + ampm;
// document.write(startTimeString);
