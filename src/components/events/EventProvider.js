import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const EventContext = createContext();

// This component establishes what data can be used.
export const EventProvider = (props) => {
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    return fetch(
      "http://localhost:8088/events?_embed=userEvents"
    )
      .then((res) => res.json())
      .then((data) => setEvents(data));
  };

  const addEvent = (eventObj) => {
    return fetch(
      "http://localhost:8088/events?_embed=userEvents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventObj),
      }
    ).then(getEvents);
  };

  const deleteEvent = (eventId) => {
    return fetch(`http://localhost:8088/events/${eventId}`, {
      method: "DELETE",
    }).then(getEvents);
  };

  const updateEvent = (eventObj) => {
    return fetch(
      `http://localhost:8088/events/${eventObj.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventObj),
      }
    ).then(getEvents);
  };

  const getEventById = (eventId) => {
    return fetch(`http://localhost:8088/events/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  return (
    <EventContext.Provider
      value={{
        events,
        getEvents,
        addEvent,
        deleteEvent,
        updateEvent,
        getEventById,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};
