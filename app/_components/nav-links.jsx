"use client";
import {
    CalendarIcon,
    HomeIcon,
    Bars2Icon,
    ClipboardIcon,
    ChatBubbleBottomCenterTextIcon
  } from '@heroicons/react/24/outline';
  

  const links = [
    { name: 'Home', href: '/home', icon: HomeIcon },
    {
      name: 'Calender',
      href: '/home/calendar',
      icon: CalendarIcon,
    },
    { name: 'WhiteBoard', href: '/home/whiteboard', icon: ClipboardIcon },
    { name: 'Messaging', href: '/home/Message', icon: ChatBubbleBottomCenterTextIcon },
    { name: 'Planing Tool', href: '/home/Planning', icon: Bars2Icon },
   
  ];
  
  export default function NavLinks() {
    return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </a>
          );
        })}
      </>
    );
  }
  