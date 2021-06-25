import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { EventContext } from "./EventProvider";
import { UserContext } from "../users/UserProvider";
// import { UserEventsContext } from "../userEvents/UserEventsProvider";

export const EventDetail = ({ eventObj }) => {
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

  return (
    <div
      className="event"
      //   YOU ONLY NEED THIS CONTAINER FOR CSS PURPOSES
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

// TIME CONVERTED BELOW
// https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no

// var timeString = "15:00";
// var H = +timeString.substr(0, 2);
// var h = H % 12 || 12;
// var ampm = H < 12 ? "AM" : "PM";
// timeString = h + timeString.substr(2, 3) + " " + ampm;
// document.write(timeString);
