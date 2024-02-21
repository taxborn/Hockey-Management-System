import Calendar from "../_components/Calendar";
import { PrismaClient } from "@prisma/client";
import CreateButton from "../_components/EventCreateButton";

const prisma = new PrismaClient();

export default async function Page() {
  // TODO: We will need to have a way to take out certain parameters and
  // push them into an 'extendedProps' dictionary, like this:
  // Event {
  //   title
  //   start
  //   end
  //   extendedProps: {
  //      homeGame: ...
  //      ...
  //   }
  // }
  // TODO: Type these events as EventInput
  const prismaEvents = await prisma.event.findMany();

  return (
    <>
      <h1 className="text-2xl font-bold">Team Calendar</h1>

      <CreateButton />

      <Calendar events={prismaEvents} />
    </>
  );
}
