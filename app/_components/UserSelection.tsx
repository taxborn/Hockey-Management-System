"use client";

import { useState } from "react";

interface Props {
  users: CustomUser[];
}

export default function UserSelection({ users }: Props) {
  // We'll use the first user as the default selected user
  const [selectedUser, setSelectedUser] = useState<CustomUser | null>(users[0]);

  // Whenever the select changes, we'll get the user object from the users array
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // We'll find the user with the same id as the selected value
    const user = users.find((user) => user.clerkId === event.target.value);
    // If the user is not found, we'll set it to null
    setSelectedUser(user || null);
  };

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
          <option key={user.clerkId} value={user.clerkId}>
            {user.name}
          </option>
        ))}
      </select>

      {selectedUser && (
        <div className="bg-white rounded p-2 my-2">
          <h2 className="font-bold">
            {selectedUser.name}{" "}
            <i className="font-normal text-gray-400">
              (Last sign in:{" "}
              {selectedUser.lastSignIn === null
                ? "Never"
                : new Date(selectedUser.lastSignIn).toLocaleDateString()}
              )
            </i>
          </h2>
          <p>ID: {selectedUser.clerkId}</p>
          {/* We know the user has at least one email, and we only care about that at the moment. */}
          <p>Email: {selectedUser.emailAddress}</p>
          <p>Role: {selectedUser.role}</p>
        </div>
      )}
    </>
  );
}
