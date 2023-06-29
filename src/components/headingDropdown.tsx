"use client";

import { IdCard } from "@/components/icons/Heroicons";
import { Popover } from "@headlessui/react";
import React from "react";

export default function HeadingDropdown() {
  return (
    <Popover className="relative">
      <Popover.Button>
        <IdCard className="w-8 h-8" />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 right-0 bg-black bg-opacity-30 rounded-lg text-white">
        <div className="grid grid-cols-1 w-32 p-2 gap-2">
          <h1 className="text-xl border-b border-white ml-1">UserName</h1>
          <button className="text-left hover:bg-primary hover:text-textLight px-1 rounded">
            Settings
          </button>
          <button className="text-left hover:bg-primary hover:text-textLight px-1 rounded">
            SwitchTheme
          </button>
          <button className="text-left hover:bg-primary hover:text-textLight px-1 rounded">
            Logout
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
