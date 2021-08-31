import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { EventContext } from "../events/EventProvider";
import { UserContext } from "./UserProvider";

export const UserList = () => {
  const { users, getUsers, deleteUser } = useContext(UserContext);
  const { events, getEvents } = useContext(EventContext);

  const history = useHistory();

  useEffect(() => {
    getUsers().then(getEvents);
  }, []);

  return (
    <>
      <h1>User List</h1>
      <div>
        {users.map((user) => {
          return (
            <>
              <h3>{user.name}</h3>
              <div>{user.email}</div>
              {/* BUTTONS */}
              <div className="button__container">
                <button
                  className="delete__button"
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  {/* DELETE BUTTON */}
                  {"❌"}
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
