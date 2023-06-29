"use client";

import {
  CalenderIcon,
  HomeIcon,
  ListIcon,
  PieChartIcon,
} from "@/components/icons/Heroicons";
import { useRouter } from "next/navigation";
import React from "react";

type NavbarProps = {
  currentPage: string;
  setCurretPage: (page: string) => void;
};

export const Navbar = ({ currentPage, setCurretPage }: NavbarProps) => {
  const { push } = useRouter();

  const pages = [
    {
      url: "/home",
      icon: <HomeIcon className="w-10 h-10" />,
    },
    {
      url: "/personalStats",
      icon: <PieChartIcon className="w-10 h-10" />,
    },
    {
      url: "/playlistOverview",
      icon: <ListIcon className="w-10 h-10" />,
    },
    {
      url: "/listeningActivity",
      icon: <CalenderIcon className="w-10 h-10" />,
    },
  ];

  return (
    <div className="fixed bottom-0 w-full">
      <div className="flex justify-evenly text-textDark border-t-2 border-textDark bg-background pb-2">
        {pages.map((p, i) => {
          return (
            <div key={i}>
              {currentPage === p.url ? (
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
                    setCurretPage(p.url);
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
