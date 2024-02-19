import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  return (
    <>
      <h1 className="text-2xl font-bold">Hello, {user?.firstName}</h1>
     
    </>
  );
}
