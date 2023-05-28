"use client";

import { useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";

/**
 * The home page.
 * @returns The home page.
 */
export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push("/login");
  }, [push]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
