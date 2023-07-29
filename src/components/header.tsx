import HeadingDropdown from "@/components/headingDropdown";
import { ApollonIcon } from "@/components/icons/ApollonIcons";
import React from "react";
import { useRouter } from "next/navigation";

export const Header = () => {
  const push = useRouter().push;

  return (
    <div className="sticky top-0 w-full text-textDark">
      <div className="flex justify-between mx-5 my-2">
        <div onClick={() => { push("/home") }}>
          <ApollonIcon width={45} height={45} />
        </div>
        <HeadingDropdown />
      </div>
    </div>
  );
};
