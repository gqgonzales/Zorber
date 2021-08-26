import React, { useContext, useState } from "react";
import { EventContext } from "./EventProvider";

export const EventSearch = () => {
  const { setSearchTerms } = useContext(EventContext);

  return (
    <div className="event-search">
      <div>
        <input
          type="text"
          className="input--wide"
          onKeyUp={(event) => {
            const searchTerms = event.target.value;
            setSearchTerms(searchTerms);
          }}
          placeholder="Search for an event..."
        />
      </div>
    </div>
  );
};
