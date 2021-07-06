import React, { useContext, useEffect, useState } from "react";
import "../Event.css";
import "../EventForms.css";
// import { useParams } from "react-router-dom";
import { UserEventsContext } from "../../userEvents/UserEventsProvider";
import { EventContext } from "../EventProvider";
import { UserContext } from "../../users/UserProvider";
import userEvent from "@testing-library/user-event";

export const TinyTimeForm = ({ userEvent, eventObj }) => {
  const authorId = eventObj.userId;
  const [showTimeForm, setShowTimeForm] = useState(false);
  const onClick = () => setShowTimeForm(!showTimeForm);

  console.log("Authors:", authorId);
  const [isLoading, setIsLoading] = useState(true);

  // const { eventId } = useParams();

  // const { users, getUsers } = useContext(UserContext);

  const { getEvents } = useContext(EventContext);

  const { updateUserEvents, deleteUserEvent } = useContext(
    UserEventsContext
  );

  const [userEventTime, setUserEventTime] = useState("");

  useEffect(() => {
    setUserEventTime(userEvent.time);
  }, [userEvent]);

  const handleUserEventTimeChange = (event) => {
    setUserEventTime(event.target.value);
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

  const handleDeleteUserEvent = () => {
    setIsLoading(true);
    deleteUserEvent(userEvent.id).then(() => {
      onClick();
      getEvents();
    });
  };

  if (
    parseInt(localStorage.getItem("zorber_user")) ===
      userEvent.userId ||
    parseInt(localStorage.getItem("zorber_user")) === authorId
  ) {
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
              className="delete__button"
              onClick={() => {
                handleDeleteUserEvent();
              }}
            >
              {/* DELETE BUTTON */}
              {" ❌  "}
            </button>
            <button
              className="button time__edit"
              onClick={() => {
                handleSaveTimeChange();
              }}
            >
              {/* SAVE BUTTON */}
              {" ✅  "}
            </button>
            <button
              className="button time__edit"
              onClick={() => {
                onClick();
              }}
            >
              {showTimeForm ? <>{" 🔙  "}</> : <>Change</>}
            </button>
          </>
        ) : (
          <button
            className="button time__edit"
            onClick={() => {
              onClick();
            }}
          >
            {/* EDIT TIME BUTTON */}
            {" ⏱ "}
          </button>
        )}
      </>
    );
  } else {
    return null;
  }
};
