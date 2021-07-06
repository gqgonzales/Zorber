import React, { useContext, useEffect, useState } from "react";

import "./EventForms.css";
import { useHistory, useParams } from "react-router-dom";
import { EventContext } from "./EventProvider";
import { UserContext } from "../users/UserProvider";
import { Multiselect } from "multiselect-react-dropdown";
import { UserEventsContext } from "../userEvents/UserEventsProvider";

export const NewEventForm = () => {
  const { addEvent, getEventById, getEvents } =
    useContext(EventContext);

  const { users, getUsers } = useContext(UserContext);
  const { addUserEvents } = useContext(UserEventsContext);

  const [userEvent, setUserEvents] = useState({
    userId: 0,
    eventId: 0,
    time: "",
  });

  // const [participants, setParticipants] = useState([]);

  //for edit, hold on to state of event in this view
  // The input fields need to be CONTROLLED and thus need to be definied form the outset.
  const [eventObj, setEvent] = useState({
    title: "",
    location: "",
    date: "",
    startTime: "",
    userId: parseInt(localStorage.getItem("zorber_user")),
    comments: "",
  });

  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);

  const { eventId } = useParams();

  const history = useHistory();

  const [participants, setParticipants] = useState([]);

  const onSelect = (selectedValue) => {
    // If an object is selected in the multiselect, add the userId to the participants array.
    // setParticipants([...participants, selectedValue]);
    // const addSelected = [...participants];
    // addSelected.push(selectedValue);
    setParticipants(selectedValue);
  };

  const onRemove = (selectedValue) => {
    // If an object is selected in the multiselect, add the userId to the participants array.
    const removeSelected = [...participants].splice(
      selectedValue
    );
    setParticipants(removeSelected);
  };

  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newEvent = { ...eventObj };
    // const newUserEvent = { ...userEvent };
    newEvent[event.target.name] = event.target.value;
    // newUserEvent[event.target.name] = event.target.value;
    //update state
    setEvent(newEvent);
    // setUserEvents(newUserEvent);
  };

  const handleSaveEvent = () => {
    //disable the button - no extra clicks
    setIsLoading(true);
    addEvent(eventObj)
      .then((res) => {
        participants.forEach((singleId) => {
          addUserEvents({
            userId: singleId.id,
            eventId: res.id,
            time: "",
          });
        });
      })
      .then(getEvents)
      // .then(() => history.push("/upcoming"));
      .then(() => history.push("/upcoming"));
  };

  // Get users and events. If eventId is in the URL, getEventById
  useEffect(() => {
    getEvents()
      .then(getUsers())
      .then(() => {
        if (eventId) {
          getEventById(eventId).then((eventRes) => {
            setEvent(eventRes);
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form className="eventForm">
      <div className="subsection__header__container__form">
        <h2 className="eventForm__title subsection__header">
          Create a New Event{" "}
        </h2>
      </div>
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventName">Title: </label>
          <input
            type="text"
            id="eventTitle"
            name="title"
            value={eventObj.title}
            required
            autoFocus
            className="form-control"
            placeholder="Give it a good title!"
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      {/* location */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventLocation">Location: </label>
          <input
            type="text"
            id="eventLocation"
            name="location"
            value={eventObj.location}
            required
            autoFocus
            className="form-control"
            placeholder="Where should we zorb?"
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      {/* DATE */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventDate">Date: </label>
          <input
            type="date"
            id="eventDate"
            name="date"
            value={eventObj.date}
            required
            autoFocus
            className="form-control"
            placeholder="When we doing this?"
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      {/* START TIME */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="startTime">Time: </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={eventObj.startTime}
            required
            autoFocus
            className="form-control"
            placeholder="When should it start?"
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      {/* USERS */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="userId">Participants: </label>
          <Multiselect
            className="multiselect"
            options={users} // Options to display in the dropdown
            selectedValues={users.selectedValue} // Preselected value to persist in dropdown
            onSelect={(selectedValue) => {
              onSelect(selectedValue);
            }} // Function will trigger on select event
            onRemove={(selectedValue) => {
              onRemove(selectedValue);
            }} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
          />
        </div>
      </fieldset>
      {/* COMMENTS */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="comments">Comments: </label>
          <input
            type="text"
            id="comments"
            name="comments"
            value={eventObj.comments}
            required
            className="form-control"
            placeholder="Add comments or a description!"
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      {/* BUTTONS */}
      <div className="button__group">
        <button
          className="button save__button"
          disabled={isLoading}
          onClick={(event) => {
            event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
            handleSaveEvent();
          }}
        >
          {/* {eventId ? (
            <>Save those changes!</>
          ) : (
            <>Create New Event</>
          )} */}
          {/* SAVE BUTTON */}
          {" ✅  "}
        </button>
        <button
          className="cancel__button"
          onClick={() => history.push("/upcoming")}
        >
          {/* CANCEL / BACK BUTTON */}
          {" 🔙  "}
        </button>
      </div>
    </form>
  );
};
