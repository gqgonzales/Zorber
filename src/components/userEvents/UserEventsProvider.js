import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const userEventContext = createContext();

// This component establishes what data can be used.
export const UserEventsProvider = (props) => {
  const [userEvents, setUserEvents] = useState([]);

  const getUserEvents = () => {
    return fetch(
      "http://localhost:8088/userEvents?_expand=event&_expand=user"
    )
      .then((res) => res.json())
      .then((data) => setUserEvents(data));
  };

  const addUserEvents = (userEventObject) => {
    return fetch(
      "http://localhost:8088/userEvents?_expand=event&_expand=user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEventObject),
      }
    ).then(getUserEvents);
  };

  const deleteUserEvents = (userEventId) => {
    return fetch(
      `http://localhost:8088/userEvents/${userEventId}`,
      {
        method: "DELETE",
      }
    ).then(getUserEvents);
  };

  const updateuserEvent = (userEvent) => {
    return fetch(
      `http://localhost:8088/userEvents/${userEvent.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEvent),
      }
    ).then(getUserEvents);
  };

  const getUserEventsById = (userEventId) => {
    return fetch(
      `http://localhost:8088/userEvents/${userEventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  };

  return (
    <userEventContext.Provider
      value={{
        userEvents,
        getUserEvents,
        addUserEvents,
        deleteUserEvents,
        updateuserEvent,
        getUserEventsById,
      }}
    >
      {props.children}
    </userEventContext.Provider>
  );
};
