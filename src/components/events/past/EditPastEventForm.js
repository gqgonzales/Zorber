import React, { useContext, useEffect, useState } from "react";

import "../EventForms.css";
import { useHistory, useParams } from "react-router-dom";
import { EventContext } from "../EventProvider";
import { Multiselect } from "multiselect-react-dropdown";
import { UserEventsContext } from "../../userEvents/UserEventsProvider";
import { UserContext } from "../../users/UserProvider";
// import Table from "react-bootstrap/Table";

export const EditPastEventForm = () => {
  const { getEventById, updateEvent, getEvents, deleteEvent } =
    useContext(EventContext);

  const { users, getUsers } = useContext(UserContext);

  const {
    addUserEvents,
    updateUserEvents,
    deleteUserEvents,
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

  // Object that needs to be updated dynamically though state for each object returned from a map.
  const [userEvent, setUserEvent] = useState({
    userId: 0,
    eventId: eventId,
    time: "",
  });

  // This is our ORIGINAL copy of the userEvents associated with this event.
  const [originalParticipants, setOriginalParticipants] =
    useState([]);

  // This is the dynamic copy of the userEvents that is updated by our changes.
  const [participants, setParticipants] = useState([]);

  // This is the orginal copy of the userEvents associated with a past event.
  const [originalTimesArray, setOriginalTimesArray] = useState(
    []
  );

  // Our dynamic copy of the userEvents Object
  const [timesArray, setTimesArray] = useState([]);

  console.log("originalTimesArray:", originalTimesArray);

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

  // Check originalParticipants for any values NOT present in participants
  // For those found values, you get a user object...you need the relationship object instead.
  // THEN send the delete request and pass in the relationship object.

  const findRemoved = () => {
    console.log("Participants:", participants);
    const currentParticipants = participants.map(
      (participant) => {
        return participant.id;
      }
    );
    // const currentParticipants = [5];
    // const toBeDeleted = [];
    const filteredParticipants = originalParticipants.filter(
      (originalParticipant) => {
        return currentParticipants.includes(
          originalParticipant.id
        );
      }
    );
    console.log("FP:", filteredParticipants);
    console.log("Part:", participants);

    // console.log("TBD", toBeDeleted);
    // const removed = [];
    // originalParticipants.forEach((participant) => {
    //   const found = participants.find(
    //     (participantObj) => participantObj.id === participant.id
    //   );
    //   if (!found) {
    //     removed.push(participant);
    //   }
    // });
    // const deletedParticipants = removed.forEach(
    //   (participant) => {
    //     const objsToRemove = [];
    //     if (participant.id === originalTimesArray.userId) {

    //     }
    //   }
    // );
    // return deletedParticipants;
  };

  // // Maybe there's another way

  // const findRemovedTwo = () => {
  //   const removedTwo = [];
  //   timesArray.forEach((relationshipObj) => {});
  // };

  // const findRemoved = () => {
  //   const removed = [];
  //   originalParticipants.forEach((user) => {
  //     const found = participants.find((u) => u === user.id);
  //     if (!found) {
  //       removed.push(user);
  //     }
  //   });

  //   return removed;
  // };

  // Send your edit command participants
  // All you need is the userIds from the multiselect
  // Then write the getUserEventsByUserId fetch call.
  // You need a formstate object?
  // getUserEventsByUserId

  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const onSelect = (selectedValue) => {
    console.log("Selected A:", selectedValue);

    setParticipants(selectedValue);
  };

  const onRemove = (selectedValue) => {
    console.log("Selected R:", selectedValue);
    setParticipants(selectedValue);
    setTimeout(findRemoved, 1000);
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

  const handleRelationshipObjChange = (event) => {
    const timesArrayDeconstruction = [...originalTimesArray];
    timesArrayDeconstruction.forEach((userEvent) => {
      // console.log("Please track me in state:", userEvent);
      setUserEvent(userEvent);
    });
    // const updateRelationshipObj = { ...userEvent };
    // // debugger;
    // updateRelationshipObj[event.target.id] = event.target.value;
    // setUserEvent(updateRelationshipObj);
  };

  // const handleRelationshipObjChange = (userEvent) => {
  //   const updateRelationshipObj = { ...timesArray };
  //   updateRelationshipObj[userEvent.target.name] =
  //     userEvent.target.value;
  //   setTimesArray(updateRelationshipObj);
  // };

  const handleSaveEvent = () => {
    // console.log(
    //   "ORIG:",
    //   originalParticipants,
    //   "CURRENT:",
    //   participants
    // );
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
        // .then(() => {
        //   if (findRemoved().length > 0) {
        //     // NEED TO GET THE USEREVENTS FOR EACH REMOVED PARTICIPANT
        //     for (const relationshipObj of findRemoved()) {
        //       deleteUserEvents(relationshipObj);
        //     }
        //   }
        // })

        // Then a .then for findRemoved().length to show what is deleted.

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
      setOriginalTimesArray(res);
      setTimesArray(res);
    });
  }, [eventId]); // eslint-disable-line react-hooks/exhaustive-deps
  // console.log(originalParticipants);

  // useEffect(() => {
  //   getUserEventsByEventId(eventId).then((res) => {
  //     const participantsArray = res.map(
  //       (userEventObj) => userEventObj.user
  //     );
  //     setParticipants(participantsArray);
  //     setTimesArray(res);
  //   });
  // }, [participants]);

  return (
    <form className="eventForm">
      <div className="subsection__header__container__form">
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
            onSelect={onSelect}
            // {(selectedValue) => {
            //   onSelect(selectedValue);
            // }}
            // Function will trigger on select event
            onRemove={onRemove}
            // {(selectedValue) => {
            //   onRemove(selectedValue);
            // }} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
          />
        </div>
      </fieldset>
      {/* TESTING TABLES */}
      {/* <TimesForm eventObj={userEvent} /> */}
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
        className="save__button"
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
