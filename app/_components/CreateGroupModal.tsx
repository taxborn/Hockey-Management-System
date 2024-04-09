"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { create_group } from "@/lib/create-group";
import { Modal } from "flowbite";

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

export default function CreateGroupModal({ users }: Props) {
  const router = useRouter();

  useEffect(() => {
    const buttonEl = document.querySelector("#modal-button") as HTMLElement;

    const handleClick = () => {
      const closeEl = document.querySelector(
        '[data-modal-hide="group-modal"]',
      ) as HTMLElement;
      const submitButton = document.querySelector(
        '[type="submit"]',
      ) as HTMLElement;
      const modalEl = document.querySelector("#group-modal") as HTMLElement;
      const modal = new Modal(modalEl);

      modal.show();

      closeEl?.addEventListener("click", () => {
        modal.hide();
      });

      submitButton?.addEventListener("click", () => {
        const group = create_group(
          new FormData(modalEl!.querySelector("form") as HTMLFormElement),
        );
        router.push("/home/admin");
        modal.hide();
      });
    };

    buttonEl?.addEventListener("click", handleClick);

    return () => {
      buttonEl?.removeEventListener("click", handleClick);
    };
  }, [router]);

  return (
    <>
      <button
        data-modal-target="group-modal"
        id="modal-button"
        data-modal-toggle="group-modal"
        // TODO: This is a hacky way to hide the button if the user is an admin, replace with a proper check
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Create Group
      </button>

      <div
        id="group-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create a new group
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="group-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Group Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Offense"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="users"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Users{" "}
                    <i className="text-gray-400">
                      (hold down ctrl to select multiple users at once)
                    </i>
                  </label>
                  {/* List of users, iterate over the users map */}
                  <select
                    id="users"
                    name="users"
                    multiple={true}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {users.map((user) => (
                      <option value={user.id} key={user.id}>
                        {user.firstName} {user.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create Group
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
