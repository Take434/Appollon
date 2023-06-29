"use client";

import {
  CalenderIcon,
  HomeIcon,
  ListIcon,
  PieChartIcon,
} from "@/components/icons/Heroicons";
import { useRouter } from "next/navigation";
import React from "react";

export const Navbar = () => {
  const [active, setActive] = React.useState<number>(0);
  const { push } = useRouter();

  return (
    <div className="fixed bottom-0 w-full">
      <div className="flex justify-evenly text-textDark border-t-2 border-textDark bg-background pb-2">
        <NavBarIcon
          navFunc={() => {
            push("/home");
            setActive(0);
          }}
          isActive={active === 0}
          Icon={<HomeIcon className="w-10 h-10" />}
        />
        <NavBarIcon
          navFunc={() => {
            push("/personalStats");
            setActive(1);
          }}
          isActive={active === 1}
          Icon={<PieChartIcon className="w-10 h-10" />}
        />
        <NavBarIcon
          navFunc={() => {
            push("/playlistOverview");
            setActive(2);
          }}
          isActive={active === 2}
          Icon={<ListIcon className="w-10 h-10" />}
        />
        <NavBarIcon
          navFunc={() => {
            push("/listeningActivity");
            setActive(3);
          }}
          isActive={active === 3}
          Icon={<CalenderIcon className="w-10 h-10" />}
        />
      </div>
    </div>
  );
};

type NavBarIconProps = {
  navFunc: () => void;
  isActive: boolean;
  Icon: React.JSX.Element;
};

const NavBarIcon = (props: NavBarIconProps) => {
  return (
    <>
      {props.isActive ? (
        <div className="bg-background p-2 rounded-b-full border-2 border-t-0 box-border border-textDark  h-10 -translate-y-[2.5px]">
          <div className="bg-primary p-1 rounded-full border border-textDark text-textLight -translate-y-8">
            {props.Icon}
          </div>
        </div>
      ) : (
        <button
          className="p-1 rounded-full text-textDark"
          onClick={() => {
            props.navFunc();
          }}
        >
          {props.Icon}
        </button>
      )}
    </>
  );
};
