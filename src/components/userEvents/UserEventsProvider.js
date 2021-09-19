import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const UserEventsContext = createContext();

// This component establishes what data can be used.
export const UserEventsProvider = (props) => {
  const [userEvents, setUserEvents] = useState([]);

  const getUserEvents = () => {
    return fetch(
      "https://zorber-api-393lv.ondigitalocean.app/userEvents?_expand=event&_expand=user"
      // {
      //   headers: {
      //     Accept: "application/json",
      //   },
      // }
    )
      .then((res) => res.json())
      .then((data) => setUserEvents(data));
  };

  const getUserEventsByEventId = (eventId) => {
    return fetch(
      `https://zorber-api-393lv.ondigitalocean.app/userEvents?eventId=${eventId}&_expand=user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  };

  const addUserEvents = (userEventObject) => {
    return fetch(
      "https://zorber-api-393lv.ondigitalocean.app/userEvents?_expand=event&_expand=user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEventObject),
      }
    );
    // .then(getUserEvents);
  };

  const deleteUserEvent = (userEventId) => {
    return fetch(
      `https://zorber-api-393lv.ondigitalocean.app/userEvents/${userEventId}`,
      {
        method: "DELETE",
      }
    ).then(getUserEvents);
  };

  const updateUserEvents = (userEvent) => {
    return fetch(
      `https://zorber-api-393lv.ondigitalocean.app/userEvents/${userEvent.id}`,
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
      `https://zorber-api-393lv.ondigitalocean.app/userEvents/${userEventId}&_expand=user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  };

  return (
    <UserEventsContext.Provider
      value={{
        userEvents,
        getUserEvents,
        addUserEvents,
        deleteUserEvent,
        updateUserEvents,
        getUserEventsById,
        getUserEventsByEventId,
      }}
    >
      {props.children}
    </UserEventsContext.Provider>
  );
};
