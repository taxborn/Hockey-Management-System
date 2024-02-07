import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="container mx-auto h-screen py-8">
      <h1 className="text-2xl font-bold">Hello, {user?.firstName}</h1>
      <a href="/calendar" className="font-semibold underline text-indigo-500">calendar</a>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nulla et cum adipisci. Quasi expedita dolore blanditiis molestias excepturi cupiditate, consectetur numquam architecto error ipsum perspiciatis, itaque iusto dicta reprehenderit.</p>
    </main>
  )
}
