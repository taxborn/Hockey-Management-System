"use client";

import { useState } from "react";

type User = {
  id: string;
  email: string;
  lastSignin: number | null;
  firstName: string | null;
  lastName: string | null;
  // This is actually the type UserPublicMetadata but we don't have it defined here
  // and typescript complains about it, so we'll just use an object for now
  public: UserPublicMetadata;
};

interface Props {
  users: User[];
}

export default function UserSelection({ users }: Props) {
  // We'll use the first user as the default selected user
  const [selectedUser, setSelectedUser] = useState<User | null>(users[0]);

  // Whenever the select changes, we'll get the user object from the users array
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // We'll find the user with the same id as the selected value
    const user = users.find((user) => user.id === event.target.value);
    // If the user is not found, we'll set it to null
    setSelectedUser(user || null);
  };

  // We'll format the date to a more readable format, if the user has never signed in
  // we'll use 0 as the default value (which evaluates to 1970-01-01)
  const date = new Date(selectedUser?.lastSignin || 0).toLocaleDateString();

  return (
    <>
      <select
        id="users"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleUserChange}
      >
        {users.map((user) => (
          // We need to use the user.id as the key because it's unique
          // and we need to fill the value with the user.id so we can
          // get the user object when the select changes
          <option key={user.id} value={user.id}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>

      {selectedUser && (
        <div className="bg-white rounded p-2 my-2">
          <h2 className="font-bold">
            {selectedUser.firstName} {selectedUser.lastName}{" "}
            <i className="font-normal text-gray-400">(Last sign in: {date})</i>
          </h2>
          {/* <p>ID: {selectedUser.id}</p> */}
          <p>Email: {selectedUser.email}</p>
          {/* This is sort of a hack to get the role name, we'll just stringify the object
              and then parse it back to get the role name */}
          <p>
            Role: {JSON.parse(JSON.stringify(selectedUser.public)).role.name}
          </p>
        </div>
      )}
    </>
  );
}
