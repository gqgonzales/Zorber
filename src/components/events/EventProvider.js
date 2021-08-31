import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const EventContext = createContext();

// This component establishes what data can be used.
export const EventProvider = (props) => {
  const [events, setEvents] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");

  const getEvents = () => {
    return fetch(
      "https://zorber-api.herokuapp.com/events?_embed=userEvents&_expand=user"
    )
      .then((res) => res.json())
      .then((data) => setEvents(data));
  };

  const addEvent = (eventObj) => {
    return fetch("https://zorber-api.herokuapp.com/events?_embed=userEvents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventObj),
    }).then((res) => res.json());
  };

  const deleteEvent = (eventId) => {
    return fetch(`https://zorber-api.herokuapp.com/events/${eventId}`, {
      method: "DELETE",
    }).then(getEvents);
  };

  const updateEvent = (eventObj) => {
    return fetch(`https://zorber-api.herokuapp.com/events/${eventObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventObj),
    }).then(getEvents);
  };

  const getEventById = (eventId) => {
    return fetch(`https://zorber-api.herokuapp.com/events/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  const searchEvents = (searchTerms) => {
    return fetch(`https://zorber-api.herokuapp.com/events?q=${searchTerms}`)
      .then((res) => res.json())
      .then(setEvents);
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
        searchEvents,
        searchTerms,
        setSearchTerms,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};
