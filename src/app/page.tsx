"use client";

import { validatedTestingAction } from "@/server-actions/test.action";
import { useState } from "react";
import React from "react";

/**
 * The home page.
 * @returns The home page.
 */
export default function Home() {
  const [msg, setMsg] = useState<string>("nothing here yet");

  return (
    <div>
      <button
        onClick={() => {
          validatedTestingAction({ stuff: "hallihallo" }).then((response) =>
            setMsg(response.message)
          );
        }}
      >
        Run server action
      </button>

      <h1>{msg}</h1>
    </div>
  );
}
