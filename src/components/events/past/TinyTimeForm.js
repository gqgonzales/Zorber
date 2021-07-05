import React, { useContext, useEffect, useState } from "react";
import "../Event.css";
import { useParams } from "react-router-dom";
import { UserEventsContext } from "../../userEvents/UserEventsProvider";
import { EventContext } from "../EventProvider";
import userEvent from "@testing-library/user-event";
import { UserContext } from "../../users/UserProvider";

export const TinyTimeForm = ({ userEvent }) => {
  const [showTimeForm, setShowTimeForm] = useState(false);
  const onClick = () => setShowTimeForm(!showTimeForm);

  const [isLoading, setIsLoading] = useState(true);

  const { eventId } = useParams();

  const { events, getEvents } = useContext(EventContext);

  const {
    getUserEvents,
    updateUserEvents,
    getUserEventsByEventId,
  } = useContext(UserEventsContext);

  //   const [timesArray, setTimesArray] = useState([]);

  const [userEventTime, setUserEventTime] = useState("");
  // console.log("userEventTime:", userEvent);

  //   TO DO LIST:
  // – HandleInputFieldChange function
  // – Pass input into state
  // – Build save handler

  useEffect(() => {
    setUserEventTime(userEvent.time);
  }, [userEvent]);

  const handleUserEventTimeChange = (event) => {
    setUserEventTime(event.target.value);
    // const updateUserEventTime = { ...userEvent };
    // updateUserEventTime[event.target.name] = event.target.value;
    // setUserEventTime(userEvent);
  };

  const handleSaveTimeChange = () => {
    setIsLoading(true);
    updateUserEvents({
      id: userEvent.id,
      userId: userEvent.userId,
      eventId: userEvent.eventId,
      time: userEventTime,
    }).then(() => {
      onClick();
      getEvents();
    });
  };

  return (
    <>
      {showTimeForm ? (
        <>
          <input
            className="time__input"
            type="text"
            name="time"
            // id={`time__input__${relationshipObj.userId}`
            // defaultValue={userEvent.time}
            value={userEventTime}
            // value={userEvent.time}
            // placeholder={userEvent.time}
            onChange={handleUserEventTimeChange}
          ></input>
          <button
            className="button time__edit"
            onClick={() => {
              handleSaveTimeChange();
            }}
          >
            Save
          </button>
          <button
            className="button time__edit"
            onClick={() => {
              onClick();
            }}
          >
            {showTimeForm ? <>Cancel</> : <>Change</>}
          </button>
        </>
      ) : (
        <button
          className="button time__edit"
          onClick={() => {
            onClick();
          }}
        >
          Edit Time
        </button>
      )}
    </>
  );
};
