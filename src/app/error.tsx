"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function GlobalError() {
  const router = useRouter();

  return (
    <div className="m-auto flex flex-col items-center">
      <h1 className="text-9xl text-primary mb-4">Oops</h1>
      <h2 className="text-2xl text-textDark">Something went wrong...</h2>
      <button
        className="border border-textDark px-2 py-1 rounded-xl mt-3 text-textDark"
        onClick={() => router.push("/login")}
      >
        back to login
      </button>
    </div>
  );
}
