import HeadingDropdown from "@/components/headingDropdown";
import { ApollonIcon } from "@/components/icons/ApollonIcons";
import React from "react";

export const Header = () => {
  return (
    <div className="sticky top-0 w-full text-textDark">
      <div className="flex justify-between mx-5 my-2">
        <ApollonIcon width={45} height={45} />
        <HeadingDropdown />
      </div>
    </div>
  );
};
