"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Header } from "@/components/header";
import { usePathname } from "next/navigation";

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const path = usePathname();
  const [currentPage, setCurrentPage] = React.useState<string>(path);

  return (
    <>
      <Header />
      {children}
      <Navbar currentPage={currentPage} setCurretPage={setCurrentPage} />
    </>
  );
}
