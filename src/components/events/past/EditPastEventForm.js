import React, { useContext, useEffect, useState } from "react";

import "../Event.css";
import { useHistory, useParams } from "react-router-dom";
import { EventContext } from "../EventProvider";
import { Multiselect } from "multiselect-react-dropdown";
import { UserEventsContext } from "../../userEvents/UserEventsProvider";
import { UserContext } from "../../users/UserProvider";
import { TimesForm } from "./TimesForm";

export const EditPastEventForm = () => {
  const { getEventById, updateEvent, getEvents, deleteEvent } =
    useContext(EventContext);

  const { users, getUsers } = useContext(UserContext);

  const {
    addUserEvents,
    updateUserEvents,
    getUserEvents,
    getUserEventsByEventId,
  } = useContext(UserEventsContext);

  const { eventId } = useParams();

  const [eventObj, setEvent] = useState({
    title: "",
    location: "",
    date: "",
    startTime: "",
    userId: parseInt(localStorage.getItem("zorber_user")),
    comments: "",
  });

  // This is our ORIGINAL copy of the userEvents associated with this event.
  const [originalParticipants, setOriginalParticipants] =
    useState([]);

  // This is the dynamic copy of the userEvents that is updated by our changes.
  const [participants, setParticipants] = useState([]);

  // Write a function that returns an array of all added users
  const findAdded = () => {
    const added = [];

    participants.forEach((participant) => {
      const found = originalParticipants.find(
        (originalParticipantObj) =>
          originalParticipantObj.id === participant.id
      );
      if (!found) {
        added.push(participant);
      }
    });
    const newParticpantObjects = added.map((userObj) => {
      return {
        userId: userObj.id,
        eventId: parseInt(eventId),
        time: "",
      };
    });
    return newParticpantObjects;
  };

  // Write a function that returns an array of all removed users
  const findRemoved = () => {
    const removed = [];
    originalParticipants.forEach((user) => {
      const found = participants.find((u) => u === user.id);
      if (!found) {
        removed.push(user);
      }
    });

    return removed;
  };

  // const findRemoved = () => {
  //   const removed = [];

  //   originalParticipants.forEach((participant) => {
  //     const found = participants.find(
  //       (originalParticipantObj) =>
  //         originalParticipantObj.id === participant.id
  //     );
  //     if (!found) {
  //       removed.push(participant);
  //     }
  //   });

  const [isLoading, setIsLoading] = useState(true);

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
    const updatePastEvent = { ...eventObj };
    //event is an object with properties.
    //set the property to the new value
    updatePastEvent[event.target.name] = event.target.value;
    //update state
    setEvent(updatePastEvent);
  };

  const handleSaveEvent = () => {
    console.log(
      "ORIG:",
      originalParticipants,
      "CURRENT:",
      participants
    );
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
        .then(() => {
          // console.log(findAdded());
          if (findAdded().length > 0) {
            for (const relationshipObj of findAdded()) {
              addUserEvents(relationshipObj);
            }
          }
        })
        // .then(
        //   addUserEvents({
        //     id: userEventObj.id,
        //     userId: userEventObj.userId,
        //     eventId: parseInt(eventId),
        //     time: "",
        //   })
        // )
        // .then(getEvents)

        // .then(() => {
        //   participants.forEach((participant) => {
        //     updateUserEvents({
        //       id: participant.id,
        //       userId: participant.userId,
        //       eventId: parseInt(eventId),
        //       time: "",
        //     });
        //   });
        // })

        // Run a setTimeout or a promise.all here????
        .then(() => history.push(`/past`));
    }
  };

  // eventObj produces response. RES has to come back first, then place it in a useEffect
  // then run after a set ammount of time / promise has been delivered.
  // Check if new participants have been added
  // If yes, add these userEvents obj to db.
  // BUT FIRST,

  // Get users and events. If eventId is in the URL, getEventById
  useEffect(() => {
    getEvents()
      .then(getUsers)
      .then((users) => {
        getUserEvents(users);
      })
      .then(() => {
        if (eventId) {
          getEventById(parseInt(eventId)).then((eventRes) => {
            setEvent(eventRes);
            // console.log(eventRes);
            // setUserEvents(eventRes);
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
      {/* TESTING TABLES */}
      <TimesForm eventObj={eventObj} />
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
