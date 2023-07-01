import React from "react";
import Image from "next/image";

export const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <Image src="/LogoWithText.svg" alt="Logo" width={500} height={500} />
      <p>Loading...</p>
    </div>
  );
};
