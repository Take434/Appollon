"use client";

import { IdentificationIcon } from "@heroicons/react/24/outline";
import { Popover } from "@headlessui/react";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { logoutUser } from "@/server-actions/loginInfo.action";

export default function HeadingDropdown() {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <Popover className="relative">
      <Popover.Button>
        <IdentificationIcon className="w-8 h-8" />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 right-0 bg-black bg-opacity-30 rounded-lg text-white">
        <div className="grid grid-cols-1 w-32 p-2 gap-2">
          <h1 className="text-xl border-b border-white ml-1">UserName</h1>
          <button className="text-left hover:bg-primary hover:text-textLight px-1 rounded text-textDark">
            Settings
          </button>
          <button
            className="text-left hover:bg-primary hover:text-textLight px-1 rounded text-textDark"
            onClick={async () => {
              await logoutUser();
              router.push("/login");
            }}
          >
            Logout
          </button>
          <button
            className="text-left hover:bg-primary hover:text-textLight px-1 rounded text-textDark"
            onClick={() =>
              router.push(
                `/about?return=${pathName.substring(1, pathName.length)}`
              )
            }
          >
            About
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
