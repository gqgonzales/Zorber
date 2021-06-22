import React, { useContext, useEffect, useState } from "react";

import "./Event.css";
import { useHistory, useParams } from "react-router-dom";
import { EventContext } from "./EventProvider";
import { UserContext } from "../users/UserProvider";
import { UserEventsContext } from "../userEvents/UserEventsProvider";
import { Multiselect } from "multiselect-react-dropdown";

export const EditPastEventForm = () => {
  const { getEventById, updateEvent, getEvents, deleteEvent } =
    useContext(EventContext);

  const { users, getUsers } = useContext(UserContext);
  const { updateUserEvents } = useContext(UserEventsContext);

  const [userEvent, setUserEvents] = useState({
    userId: 0,
    eventId: 0,
    time: "",
  });

  // const [user, serUsers] = useState([]);

  //for edit, hold on to state of event in this view
  // The input fields need to be CONTROLLED and thus need to be definied form the outset.
  const [eventObj, setEvent] = useState({
    title: "",
    location: "",
    date: "",
    startTime: "",
    userId: 0,
    comments: "",
  });

  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);

  const { eventId } = useParams();
  const history = useHistory();

  const [participants, setParticipants] = useState([]);

  const onSelect = (selectedValue) => {
    // If an object is selected in the multiselect, add the userId to the participants array.
    setParticipants(selectedValue);
  };

  const onRemove = (selectedValue) => {
    // If an object is selected in the multiselect, add the userId to the participants array.
    const removeSelected = [...participants].splice(
      selectedValue
    );
    setParticipants(removeSelected);
  };

  //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const updatePastEvent = { ...eventObj };
    //event is an object with properties.
    //set the property to the new value
    updatePastEvent[event.target.name] = event.target.value;
    //update state
    setEvent(updatePastEvent);
  };

  const handleSaveEvent = () => {
    if (parseInt(eventObj.eventId) === 0) {
      window.alert(
        "Please enter all required fields to continue."
      );
    } else {
      //disable the button - no extra clicks
      setIsLoading(true);
      //PUT - update
      updateEvent({
        id: parseInt(eventId),
        title: eventObj.title,
        location: eventObj.location,
        date: eventObj.date,
        startTime: eventObj.startTime,
        userId: eventObj.userId,
        comments: eventObj.comments,
      })
        // .then((res) => {
        //   participants.forEach((singleId) => {
        //     updateUserEvents({
        //       userId: singleId.id,
        //       eventId: res.id,
        //       time: "",
        //     });
        //   });
        // })
        // .then(getEvents)
        .then(() => history.push(`/past`));
    }
  };

  // Get users and events. If eventId is in the URL, getEventById
  useEffect(() => {
    getEvents()
      .then(getUsers())
      .then(() => {
        if (eventId) {
          getEventById(parseInt(eventId)).then((eventRes) => {
            setEvent(eventRes);
            setUserEvents(eventRes);
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form className="eventForm">
      <div className="subsection__header__container">
        <h2 className="eventForm__title subsection__header">
          Edit this Event{" "}
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
      {/* Start Time */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventDate">Time: </label>
          <input
            type="time"
            id="eventDate"
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
      {/* USERS? */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="userId">Participants: </label>
          <Multiselect
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
          <label htmlFor="eventComments">Comments: </label>
          <input
            type="text"
            id="eventComments"
            name="comments"
            value={eventObj.comments}
            required
            className="form-control"
            placeholder="Add comments or a description!"
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      {/* ONE MORE */}
      <button
        className="delete__button"
        onClick={() => {
          deleteEvent(eventId);
          history.push("/past");
        }}
      >
        Delete
      </button>
      <button
        className="btn btn-primary"
        disabled={isLoading}
        onClick={(event) => {
          event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
          handleSaveEvent();
        }}
      >
        {eventId ? (
          <>Save Changes</>
        ) : (
          <>Something wrong with this ternary</>
        )}
      </button>
      <button
        className="cancel__button"
        onClick={() => history.push("/past")}
      >
        Cancel!
      </button>

      {/* ------------------------------------ */}
    </form>
  );
};
