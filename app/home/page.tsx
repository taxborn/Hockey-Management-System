import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/turso";

export default async function Home() {
  // Role ID 3 here denotes the 'player' RoleId and is the default role for all new users.
  // TODO: Revert back to 3, this allows all new users to be admins for the time being
  const PLAYER_ROLE_ID = 1;

  const user = await currentUser();

  // We first check if the user is in our database (not Clerk's), since
  // we need to keep track of that for roles and other data. We use the
  // upsert method to create the user if they don't exist,
  const prismaUser = await prisma.users.upsert({
    where: {
      clerkId: user!.id,
    },
    create: {
      clerkId: user!.id,
      role: {
        connect: {
          id: PLAYER_ROLE_ID,
        },
      },
    },
    // We don't need to update anything, but we need to provide an empty object
    update: {},
  });

  // Get a list of groups the user is in
  const groups = await prisma.userGroups.findMany({
    where: {
      users: {
        some: {
          id: {
            equals: prismaUser.id,
          },
        },
      },
    },
  });

  // Get the 3 most recent events that the user is invited to,
  // either through a group or directly. We order by start date
  // starting from the soonest event.
  const events = await prisma.events.findMany({
    where: {
      OR: [
        {
          group: {
            users: {
              some: {
                id: {
                  equals: prismaUser.id,
                },
              },
            },
          },
        },
        {
          groupId: {
            equals: null,
          },
        },
      ],
      start_date: {
        gte: new Date(),
      },
    },
    orderBy: {
      start_date: "asc",
    },
    take: 3,
  });

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Hello, {user?.firstName}!</h1>
      <h2 className="text-xl">Here are your upcoming events:</h2>
      {events.length === 0 && <p>No upcoming events</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded p-4">
            <h3 className="font-bold text-xl tracking-wide">{event.name}</h3>
            <p className="italic text-gray-600">{event.location}</p>
            <p>{event.start_date.toDateString()} @ {event.start_date.toLocaleTimeString()} (in {Math.floor((event.start_date.getTime() - new Date().getTime()) / (1000 * 3600 * 24))} day(s))</p>
            <p className="italic">{event.description}</p>
          </div>
        ))}
      </div>
      <a href="/home/calendar" className="my-2">Go to calendar &rarr;</a>
      <h3 className="text-xl mt-8">Revisit these drills...</h3>
    </>
  );
}
