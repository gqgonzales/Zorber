import React, { useContext, useEffect, useState } from "react";

import "./Event.css";
import { useHistory, useParams } from "react-router-dom";
import { EventContext } from "./EventProvider";
import { UserContext } from "../users/UserProvider";
import { Multiselect } from "multiselect-react-dropdown";

export const EditEventForm = () => {
  const {
    addEvent,
    getEventById,
    updateEvent,
    getEvents,
    events,
    deleteEvent,
  } = useContext(EventContext);

  const { users, getUsers } = useContext(UserContext);

  const [user, serUsers] = useState([]);

  //for edit, hold on to state of event in this view
  // The input fields need to be CONTROLLED and thus need to be definied form the outset.
  const [event, setEvent] = useState({
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

  //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newEvent = { ...event };
    //event is an object with properties.
    //set the property to the new value
    newEvent[event.target.name] = event.target.value;
    //update state
    setEvent(newEvent);
  };

  const handleSaveEvent = () => {
    if (parseInt(event.eventId) === 0) {
      window.alert(
        "Please enter all required fields to continue."
      );
    } else {
      //disable the button - no extra clicks
      setIsLoading(true);
      if (eventId) {
        //PUT - update
        updateEvent({
          eventId: parseInt(event.eventId),
          title: event.title,
          location: event.location,
          date: event.date,
          startTime: event.startTime,
          userId: event.userId,
          comments: event.comments,
        }).then(() => history.push(`/past`));
      } else {
        const newEventObject = {
          title: event.title,
          location: event.location,
          date: event.date,
          startTime: event.startTime,
          userId: event.userId,
          comments: event.comments,
        };
        addEvent(newEventObject).then(() =>
          history.push("/upcoming")
        );
      }
    }
  };

  // Get users and events. If eventId is in the URL, getEventById
  useEffect(() => {
    getEvents()
      .then(getUsers())
      .then(() => {
        if (eventId) {
          getEventById(eventId).then((event) => {
            setEvent(event);
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //   onSelect(selectedList, selectedItem) {
  //     ...
  // }

  // onRemove(selectedList, removedItem) {
  //     ...
  // }

  //since state controlls this component, we no longer need
  //useRef(null) or ref

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
            name="name"
            value={event.title}
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
            value={event.location}
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
            value={event.date}
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
            value={event.startTime}
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
            onSelect={users.onSelect} // Function will trigger on select event
            onRemove={users.onRemove} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
          />
        </div>
      </fieldset>
      {/* <fieldset>
        <div className="form-group">
          <label htmlFor="userId">Participants: </label>
          <select
            value={users.id}
            name="userId"
            id="eventUsers"
            className="form-control"
            onChange={handleControlledInputChange}
          >
            <option value="0">Add users</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset> */}
      {/* COMMENTS */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventComments">Comments: </label>
          <input
            type="text"
            id="eventComments"
            name="comments"
            value={event.comments}
            required
            className="form-control"
            placeholder="Add comments or a description!"
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      {/* ONE MORE */}
      <button className="delete__button" onClick={deleteEvent}>
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
