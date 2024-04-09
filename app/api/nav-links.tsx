import React from "react";
import {
  CalendarIcon,
  HomeIcon,
  Bars2Icon,
  ClipboardIcon,
  ChatBubbleBottomCenterTextIcon,
  CircleStackIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const links = [
  { name: "Home", href: "/home", icon: HomeIcon },
  { name: "Calendar", href: "/home/calendar", icon: CalendarIcon },
  { name: "Whiteboard", href: "/home/whiteboard", icon: ClipboardIcon },
  {
    name: "Messaging",
    href: "/home/message",
    icon: ChatBubbleBottomCenterTextIcon,
  },
  { name: "Planning Tool", href: "/home/planning", icon: Bars2Icon },
  { name: "Storage", href: "/home/planning", icon: CircleStackIcon },
  { name: "Administration", href: "/home/admin", icon: BuildingLibraryIcon },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-purple-900 p-3 text-sm font-medium hover:bg-purple-800 md:flex-none hover:text-purple-800 md:justify-start md:p-9 md:px-3 focus:bg-purple-700"
          >
            <link.icon className="w-6 text-white font-bold" />
            <p className="hidden md:block text-white font-bold">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
