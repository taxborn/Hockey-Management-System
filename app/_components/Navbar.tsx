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
      <div className="flex justify-between mx-auto">
        <Link href="/home">
          <Image
            src="/logo/MAV1_3C-OnDark.png"
            alt="MSU logo"
            width={100}
            height={50}
          />
        </Link>
        <div
          style={{
            width: "100%",
            textAlign: "left",
            paddingLeft: "20px",
            paddingTop: "20px",
          }}
        >
          <a
            href={userId ? "/home" : "/"}
            className="text-xl font-bold tracking-tight text-white"
          >
            MNSU Women{"'"}s Hockey Team
          </a>
        </div>

        {/* TODO: Replace the given <UserButton> Clerk button with something more light-weight */}
        {userId ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <div className="text-white font-bold">
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
