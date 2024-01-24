import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="container mx-auto h-screen">
      <UserButton afterSignOutUrl="/" />

      <h1 className="text-2xl font-bold">Hockey Management System</h1>
    </main>
  )
}
