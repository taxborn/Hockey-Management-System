"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { userId } = useAuth();

  return (
    <nav className="p-4 bg-purple-900 w-full">
      <div className="flex justify-between align-middle mx-auto">
        <div className="flex align-middle">
          <Link href={userId ? "/home" : "/"}>
            <Image
              src="/logo/MAV1_3C-OnDark.png"
              alt="MNSU logo"
              width={75}
              height={75}
            />
          </Link>

          <div className="text-white font-bold content-center">
            <a
              href={userId ? "/home" : "/"}
              className="text-xl hidden md:block font-bold tracking-tight text-white ml-4"
            >
              MNSU Women{"'"}s Hockey Team
            </a>
          </div>
        </div>

        {/* TODO: Replace the given <UserButton> Clerk button with something more light-weight */}
        {userId ? (
          <div className="content-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <div className="text-white font-bold content-center">
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
