"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Header } from "@/components/header";
export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Navbar />
    </>
  );
}
