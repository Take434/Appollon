import { ApollonIcon } from "@/components/icons/ApollonIcons";
import { IdCard } from "@/components/icons/Heroicons";
import React from "react";

export const Header = () => {
  return (
    <div className="sticky top-0 w-full text-textDark">
      <div className="flex justify-between mx-5 my-2">
        <ApollonIcon className="w-8 h-8 " />
        <IdCard className="w-8 h-8" />
      </div>
    </div>
  );
};
