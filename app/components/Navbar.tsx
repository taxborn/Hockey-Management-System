import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="p-4 bg-indigo-200 w-full">
      <div className="flex justify-between max-w-screen-xl mx-auto">
        <h2 className="text-xl font-bold tracking-tight">Hockey Management System</h2>

        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  )
}