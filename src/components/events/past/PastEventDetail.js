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
    userEvents,
  } = eventObj;

  const history = useHistory();
  const { users } = useContext(UserContext);
  // const { userEventsObj } = useContext(UserEventsContext);

  //   const { getEvents } = useContext(EventContext);

  // useEffect(() => {
  //   getEvents().then(getUsers).then(getUserEvents);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //   const [participants, setParticipants] = useState([]);

  const getUserById = (id) => {
    const participant = users.filter((user) => {
      return user.id === id;
    });

    return participant[0];
  };

  const sortedUsers = [...userEvents].sort((a, b) =>
    a.time.localeCompare(b.time)
  );
  // console.log("LABEL:", sortedUsers);
  // return sortedUsers;
  // };

  // const updatedStartTime = { startTime };
  // updatedStartTime.toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  // FILTERING BY TIME
  /* 
  const sortedTimes = targetArray.sort(
      (a, b) => parseInt(a.time) - parseInt(b.time)
    );
    console.log("TAG", sortedTimes);
    setFilteredEvents(sortedTimes);
  */

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
        <h4 className="event__location">{location}</h4>
        <div className="event__date event__startTime">
          {date} at {startTime}
        </div>
        <div className="event__comments">{comments}</div>
        {sortedUsers.map((userEvent, index) => {
          var cls =
            index === 0 ? "winner" : "event__participant";
          return (
            <>
              <div
                className={cls}
                key={`event__participant--${userEvent.id}`}
              >
                {getUserById(userEvent.userId).name}, who
                completed the course in {userEvent.time}
              </div>
              <div>
                <TinyTimeForm userEvent={userEvent} />
              </div>
              {/* <button
                className="button"
                onClick={() => {
                  onClick();
                }}
              >
                {showTimeForm ? <>Cancel</> : <>Change</>}{" "}
              </button> */}
            </>
          );
        })}
      </div>
      <div className="button_group">
        <button
          className="button"
          onClick={() => {
            history.push(`/past/edit/${id}`);
          }}
        >
          Edit Event
        </button>
      </div>
    </div>
  );
};

// TIME CONVERTED BELOW
// https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no

// var startTimeString = "15:00";
// var H = +startTimeString.substr(0, 2);
// var h = H % 12 || 12;
// var ampm = H < 12 ? "AM" : "PM";
// startTimeString = h + startTimeString.substr(2, 3) + " " + ampm;
// document.write(startTimeString);
