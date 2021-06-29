import React, { useContext, useEffect, useState } from "react";

import "../Event.css";
import { useHistory, useParams } from "react-router-dom";
import { EventContext } from "../EventProvider";
import { UserContext } from "../../users/UserProvider";
import { Multiselect } from "multiselect-react-dropdown";
import { UserEventsContext } from "../../userEvents/UserEventsProvider";

export const EditUpcomingEventForm = () => {
  const { getEventById, updateEvent, getEvents, deleteEvent } =
    useContext(EventContext);

  const { users, getUsers } = useContext(UserContext);

  const {
    addUserEvents,
    updateUserEvents,
    getUserEvents,
    getUserEventsByEventId,
  } = useContext(UserEventsContext);

  const [eventObj, setEvent] = useState({
    title: "",
    location: "",
    date: "",
    startTime: "",
    userId: parseInt(localStorage.getItem("zorber_user")),
    comments: "",
  });

  const [originalParticipants, setOriginalParticipants] =
    useState([]);

  const [participants, setParticipants] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const { eventId } = useParams();

  const history = useHistory();

  const onSelect = (selectedValue) => {
    setParticipants(selectedValue);
  };

  const onRemove = (selectedValue) => {
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
    const updateUpcomingEvent = { ...eventObj };
    //event is an object with properties.
    //set the property to the new value
    updateUpcomingEvent[event.target.name] = event.target.value;
    //update state
    setEvent(updateUpcomingEvent);
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
        .then(getEvents)
        .then(() => {
          participants.forEach((userEventObj) => {
            updateUserEvents({
              id: userEventObj.id,
              userId: userEventObj.userId,
              eventId: parseInt(eventId),
              time: "",
            });
          });
        })
        .then(() => history.push(`/upcoming`));
    }
  };

  // Get users and events. If eventId is in the URL, getEventById
  useEffect(() => {
    getEvents()
      .then(getUsers)
      .then(getUserEvents)
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

  useEffect(() => {
    getUserEventsByEventId(eventId).then((res) => {
      const participantsArray = res.map(
        (userEventObj) => userEventObj.user
      );
      setOriginalParticipants(participantsArray);
      setParticipants(participantsArray);
    });
  }, [eventId]); // eslint-disable-line react-hooks/exhaustive-deps
  // console.log(originalParticipants);

  return (
    <form className="eventForm">
      <div className="subsection__header__container">
        <h2 className="eventForm__title subsection__header">
          Create a new event{" "}
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
      {/* USERS? */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="userId">Participants: </label>
          <Multiselect
            options={users} // Options to display in the dropdown
            selectedValues={participants} // Preselected value to persist in dropdown
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
      {/* ONE MORE */}
      <button
        className="delete__button"
        onClick={() => {
          deleteEvent(eventId);
          history.push("/upcoming");
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
          <>Save those changes!</>
        ) : (
          <>Create New Event</>
        )}
      </button>
      <button
        className="cancel__button"
        onClick={() => history.push("/upcoming")}
      >
        Cancel!
      </button>
    </form>
  );
};
