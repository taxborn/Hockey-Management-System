import { useState, useEffect } from "react";
import { create_event as create_calendar_event } from "@/app/api/create-event";
import { Modal } from "flowbite";

export default function EventModal() {
  useEffect(() => {
    const buttonEl = document.querySelector("#modal-button") as HTMLElement;

    const handleClick = () => {
      const closeEl = document.querySelector(
        '[data-modal-hide="authentication-modal"]',
      ) as HTMLElement;
      const submitButton = document.querySelector(
        '[type="submit"]',
      ) as HTMLElement;
      const modalEl = document.querySelector(
        "#authentication-modal",
      ) as HTMLElement;
      const modal = new Modal(modalEl);

      modal.show();

      closeEl?.addEventListener("click", () => {
        modal.hide();
      });

      submitButton?.addEventListener("click", () => {
        create_calendar_event(
          new FormData(modalEl!.querySelector("form") as HTMLFormElement),
        );
        modal.hide();
        // TODO: Refresh the calendar
      });
    };

    buttonEl?.addEventListener("click", handleClick);

    return () => {
      buttonEl?.removeEventListener("click", handleClick);
    };
  }, []);
  // Since this is defaulted to true, the event will be an all-day event
  // If the user unchecks the box, we will show the end date input
  const [allDay, setAllDay] = useState(true);

  // This function will be called when the user checks or unchecks the box
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAllDay(event.target.checked);

  return (
    <>
      <button
        data-modal-target="authentication-modal"
        id="modal-button"
        data-modal-toggle="authentication-modal"
        // TODO: This is a hacky way to hide the button if the user is an admin, replace with a proper check
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Create Event
      </button>

      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create a new event
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
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
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="vs. Bemidji"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="7:07pm Hockey Game"
                  />
                </div>

                <div>
                <label
                  htmlFor="color"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Event color
                </label>
                <select
                  id="color"
                  name="color"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Blue</option>
                  <option>Red</option>
                  <option>Green</option>
                  <option>Purple</option>
                  <option>Yellow</option>
                </select>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Brensen Arena"
                  />
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="all-day"
                    checked={allDay}
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="all-day"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    All-day event?
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="start"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {allDay ? "Date" : "Start Date"}
                  </label>
                  <input
                    type={allDay ? "date" : "datetime-local"}
                    name="start"
                    id="start"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Brensen Arena"
                    required
                  />
                </div>

                <div className={allDay ? "hidden" : ""}>
                  <label
                    htmlFor="end"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    name="end"
                    id="end"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Brensen Arena"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create Event
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
