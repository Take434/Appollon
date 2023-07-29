"use client";

import {
  CalendarIcon,
  HomeIcon,
  ListBulletIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const { push } = useRouter();
  const currentPage = usePathname();

  const pages = [
    {
      url: "/home",
      match: "/home",
      icon: <HomeIcon className="w-10 h-10" />,
    },
    {
      url: "/personalStats",
      match: "/personalStats",
      icon: <ChartPieIcon className="w-10 h-10" />,
    },
    {
      url: "/playlists",
      match: "/playlists/*",
      icon: <ListBulletIcon className="w-10 h-10" />,
    },
    {
      url: "/listeningActivity",
      match: "/listeningActivity",
      icon: <CalendarIcon className="w-10 h-10" />,
    },
  ];

  return (
    <div className="fixed bottom-0 w-full">
      <div className="flex justify-evenly text-textDark border-t-2 border-textDark bg-background">
        {pages.map((p, i) => {
          return (
            <div key={i}>
              {currentPage.match(p.match) ? (
                <div className="bg-background p-2 rounded-b-full border-2 border-t-0 box-border border-textDark  h-10 -translate-y-[2.5px]">
                  <div className="bg-primary p-1 rounded-full border border-textDark text-textLight -translate-y-8">
                    {p.icon}
                  </div>
                </div>
              ) : (
                <button
                  className="p-1 rounded-full text-textDark"
                  onClick={() => {
                    push(p.url);
                  }}
                >
                  {p.icon}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
