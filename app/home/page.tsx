import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  return (
    <>
      <h1 className="text-2xl font-bold">Hello, {user?.firstName}</h1>
      <a href="/calendar" className="font-semibold underline text-indigo-500">
        calendar
      </a>
      <a> </a>
      <a href="/whiteboard" className="font-semibold underline text-indigo-500">  
        whiteboard 
      </a>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nulla et
        cum adipisci. Quasi expedita dolore blanditiis molestias excepturi
        cupiditate, consectetur numquam architecto error ipsum perspiciatis,
        itaque iusto dicta reprehenderit.
      </p>
    </>
  );
}
