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

export default function SideNav() {
  return (
    <div className="bg-purple-900 flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-purple-900 p-3 text-sm font-medium hover:bg-purple-800 md:flex-none hover:text-purple-800 md:justify-start md:p-9 md:px-3 focus:bg-purple-700"
          >
            <LinkIcon className="w-4 sm:w-6 text-white font-bold" />
            <p className="hidden md:block text-white font-bold">{link.name}</p>
          </Link>
        );
      })}
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}
