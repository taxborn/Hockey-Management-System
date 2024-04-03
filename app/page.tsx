"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { userId } = useAuth();
  const router = useRouter();

  // If the user is logged in, redirect to /home
  if (userId) router.push("/home");

  return (
    <>
      <h1 className=" text-2xl font-bold">Goal Guardian</h1>
      <p>Goal Guardian is a team-management application...</p>
    </>
  );
}
