import { Modal } from "flowbite";
import { create_event } from "./create-event";

export function handleEventCreation(date: string | null) {
  // Construct the modal
  const modalEl = document.querySelector(
    "#authentication-modal",
  ) as HTMLElement;
  const modal = new Modal(modalEl);
  // Get the close button and the submit button
  const closeEl = document.querySelector(
    '[data-modal-hide="authentication-modal"]',
  ) as HTMLElement;
  const submitButton = document.querySelector('[type="submit"]') as HTMLElement;
  const form = modalEl.querySelector("form") as HTMLFormElement;

  // Set the date of the event to the date the user clicked on, or today's date
  const dateElement = document.querySelector("#start") as HTMLInputElement;
  dateElement.value = date || new Date().toISOString().split("T")[0];

  modal.show();

  // Add event listeners to the close and submit buttons
  closeEl?.addEventListener("click", () => modal.hide());
  submitButton?.addEventListener("click", (clickEvent) => {
    // If the form is not valid, don't do anything
    if (!form?.checkValidity()) return;

    // Prevent the form from submitting, we'll handle it ourselves
    clickEvent.preventDefault();

    // TODO: Instead of refreshing the page, we should add the event to the calendar
    // and close the modal. That *probably* isn't possible in a client component.
    create_event(new FormData(form));

    modal?.hide();
    // Clear the form
    form?.reset();

    // This is a bit of a hack, but sometimes when the modal is closed, the backdrop
    // doesn't go away. This will force it to go away.
    const modalBackdrop = document.querySelector(
      "[modal-backdrop]",
    ) as HTMLElement;
    if (modalBackdrop) modalBackdrop.style.display = "none";
  });
}
