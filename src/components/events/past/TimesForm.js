import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";

import "../Event.css";
import { useHistory, useParams } from "react-router-dom";
import { UserEventsContext } from "../../userEvents/UserEventsProvider";
import userEvent from "@testing-library/user-event";
import { UserContext } from "../../users/UserProvider";

export const TimesForm = ({ eventObj }) => {
  const { userEvents } = eventObj;
  const history = useHistory();
  const { eventId } = useParams();
  const {
    updateUserEvents,
    getUserEventsByEventId,
    getUserEvents,
  } = useContext(UserEventsContext);
  const { users } = useContext(UserContext);

  // This is our ORIGINAL copy of the userEvents associated with this event.
  const [originalParticipants, setOriginalParticipants] =
    useState([]);

  // This is the dynamic copy of the userEvents that is updated by our changes.
  const [participants, setParticipants] = useState([]);

  const [timesArray, setTimesArray] = useState([]);

  // const handleControlledInputChange = (userEventObj) => {
  //   //When changing a state object or array,
  //   //always create a copy make changes, and then set state.
  //   const updateUserEventObj = { ...userEventObj };
  //   //event is an object with properties.
  //   //set the property to the new value
  //   updateUserEventObj[userEventObj.target.name] = userEventObj.target.value;
  //   //update state
  //   setEvent(updateUserEventObj);
  // };

  // const handleSaveTimes = () => {
  //   updateUserEvents({
  //     id:
  //     userId:
  //     eventId:
  //     time:
  //   });
  // };

  useEffect(() => {
    getUserEvents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getUserEvents();
  }, [participants]);

  useEffect(() => {
    getUserEventsByEventId(eventId).then((res) => {
      const participantsArray = res.map(
        (userEventObj) => userEventObj.user
      );
      setOriginalParticipants(participantsArray);
      setParticipants(participantsArray);
      setTimesArray(res);
    });
  }, [eventId]);

  return (
    <>
      {/* --------------------- TABLE? ------------------- */}

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Particpant</th>
            <th>Time</th>
          </tr>
        </thead>
        {timesArray.map((relationshipObj) => {
          return (
            <tbody>
              <tr>
                <td>{relationshipObj.user.name}</td>
                {/* <td>{getUserById(userEvent.userId).name}</td> */}
                <td>
                  <input
                    className="time__input"
                    type="text"
                    placeholder={relationshipObj.time}
                  ></input>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      {/* --------------------- BUTTONS ------------------- */}
      <button
        // className="btn"
        onClick={(event) => {
          event.preventDefault();
          // handleSaveTimes();
        }}
      >
        Apply Time Changes
      </button>
    </>
  );
};
