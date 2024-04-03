"use client";

import { useState } from "react";

type User = {
  id: string;
  email: string;
  lastSignin: number | null;
  firstName: string | null;
  public: UserPublicMetadata;
  lastName: string | null;
};

interface Props {
  users: User[];
}

export default function UserSelection({ users }: Props) {
  // We'll use the first user as the default selected user
  const [selectedUser, setSelectedUser] = useState<User | null>(users[0]);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user || null);
  };

  const date = new Date(selectedUser?.lastSignin || 0).toLocaleDateString();

  return (
    <>
      <select
        id="users"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleUserChange}
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>

      {selectedUser && (
        <div>
          <h2>
            {selectedUser.firstName} {selectedUser.lastName}
          </h2>
          <p>Last sign in: {date}</p>
          <p>Email: {selectedUser.email}</p>
          <p>ID: {selectedUser.id}</p>
          <p>
            Role:{" "}
            {JSON.parse(JSON.stringify(selectedUser.public))["role"]["name"]}
          </p>
        </div>
      )}
    </>
  );
}
