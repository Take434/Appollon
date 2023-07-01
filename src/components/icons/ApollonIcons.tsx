import React from "react";
import Image from "next/image";

type ApollonIconProps = {
  className?: string;
  width: number;
  height: number;
};

export const ApollonIcon = ({ className, width, height }: ApollonIconProps) => {
  return (
    <Image
      src="/Logo.svg"
      alt="logo"
      width={width}
      height={height}
      className={className}
    />
  );
};
