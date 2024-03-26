"use client";

import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { userId } = useAuth();

  return (
    <nav className="p-4 bg-indigo-200 w-full">
      <div className="flex justify-between max-w-screen-xl mx-auto">
        <a
          href={userId ? "/home" : "/"}
          className="text-xl font-bold tracking-tight"
        >
          MNSU Women{"'"}s Hockey Team
        </a>

        {/* TODO: Replace the given <UserButton> Clerk button with something more light-weight */}
        {userId ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <div>
            <a href="/sign-in" className="mr-2">
              sign in
            </a>
            <a href="/sign-up">sign up</a>
          </div>
        )}
      </div>
    </nav>
  );
}
