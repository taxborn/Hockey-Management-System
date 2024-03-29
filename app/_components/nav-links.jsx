"use client";
import {
  CalendarIcon,
  HomeIcon,
  Bars2Icon,
  ClipboardIcon,
  ChatBubbleBottomCenterTextIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";

const links = [
  { name: "Home", href: "/home", icon: HomeIcon },
  {
    name: "Calendar",
    href: "/home/calendar",
    icon: CalendarIcon,
  },
  { name: "Whiteboard", href: "/home/whiteboard", icon: ClipboardIcon },
  {
    name: "Messaging",
    href: "/home/message",
    icon: ChatBubbleBottomCenterTextIcon,
  },
  { name: "Planning Tool", href: "/home/planning", icon: Bars2Icon },
  { name: "Storage", href: "/home/planning", icon: CircleStackIcon },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
