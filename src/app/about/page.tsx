"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <div className="text-textDark flex items-center justify-center h-screen">
      <h1>About</h1>
      <button
        className="px-2 py-1 rounded-xl border border-textDark text-textDark"
        onClick={() => router.back()}
      >
        back
      </button>
    </div>
  );
}
