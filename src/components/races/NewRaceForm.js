import React, { useContext, useEffect, useState } from "react";

import "./Race.css";
import { useHistory, useParams } from "react-router-dom";
import { RaceContext } from "./RaceProvider";

export const NewRaceForm = () => {
  const { addRace, getRaceById, updateRace, getRaces, races } =
    useContext(RaceContext);

  //for edit, hold on to state of race in this view
  // The input fields need to be CONTROLLED and thus need to be definied form the outset.
  const [race, setRace] = useState({
    title: "",
    location: "",
    date: "",
    startTime: "",
    userId: 0,
    comments: "",
  });
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);

  const { raceId } = useParams();
  const history = useHistory();

  //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newRace = { ...race };
    //race is an object with properties.
    //set the property to the new value
    newRace[event.target.name] = event.target.value;
    //update state
    setRace(newRace);
  };

  const handleSaveRace = () => {
    if (parseInt(race.raceId) === 0) {
      window.alert(
        "Please enter all required fields to continue."
      );
    } else {
      //disable the button - no extra clicks
      setIsLoading(true);
      if (raceId) {
        //PUT - update
        updateRace({
          raceId: parseInt(race.raceId),
          name: race.name,
          location: race.location,
          squareFootage: parseInt(race.squareFootage),
          handicapAccessible: race.handicapAccessible,
        }).then(() => history.push(`/races`));
      } else {
        const newRaceObject = {
          name: race.name,
          location: race.location,
          squareFootage: parseInt(race.squareFootage),
          handicapAccessible: race.handicapAccessible,
        };
        addRace(newRaceObject).then(() =>
          history.push("/races")
        );
      }
    }
  };

  // Get customers and races. If raceId is in the URL, getRaceById
  useEffect(() => {
    getRaces().then(() => {
      if (raceId) {
        getRaceById(raceId).then((race) => {
          setRace(race);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //since state controlls this component, we no longer need
  //useRef(null) or ref

  return (
    <form className="raceForm">
      <div className="subsection__header__container">
        <h2 className="raceForm__title subsection__header">
          Create a New Race!{" "}
        </h2>
      </div>
      <fieldset>
        <div className="form-group">
          <label htmlFor="raceName">Title: </label>
          <input
            type="text"
            id="raceTitle"
            name="name"
            value={race.title}
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
          <label htmlFor="raceLocation">Location: </label>
          <input
            type="text"
            id="raceLocation"
            name="location"
            value={race.location}
            required
            autoFocus
            className="form-control"
            placeholder="Where should we zorb?"
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="raceDate">Date: </label>
          <input
            type="date"
            id="raceDate"
            name="date"
            value={race.date}
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
          <label htmlFor="raceDate">Time: </label>
          <input
            type="time"
            id="raceDate"
            name="startTime"
            value={race.startTime}
            required
            autoFocus
            className="form-control"
            placeholder="When should it start?"
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      {/* ONE MORE */}
      <button
        className="btn btn-primary"
        disabled={isLoading}
        onClick={(event) => {
          event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
          handleSaveRace();
        }}
      >
        {raceId ? <>Save those changes!</> : <>Build it!</>}
      </button>
      <button
        class="cancel__button"
        onClick={() => history.push("/upcoming")}
      >
        Cancel!
      </button>
    </form>
  );
};
