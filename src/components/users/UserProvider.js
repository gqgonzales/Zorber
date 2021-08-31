import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const UserContext = createContext();

// This component establishes what data can be used.
export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    return fetch(
      "https://zorber-api.herokuapp.com/users?_embed=userEvents&_embed=events"
    )
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  const addUser = (userObject) => {
    return fetch(
      "https://zorber-api.herokuapp.com/users?_embed=userEvents&_embed=events",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObject),
      }
    ).then(getUsers);
  };

  const deleteUser = (userId) => {
    return fetch(`https://zorber-api.herokuapp.com/users/${userId}`, {
      method: "DELETE",
    }).then(getUsers);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        addUser,
        deleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
