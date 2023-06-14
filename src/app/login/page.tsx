"use client";

import { RedirectSpotifyAction } from "@/server-actions/spotifyHandling.action";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  //THIS IS A TEMPORARY FIX FOR A BUG ONLY HAPPENING IN DEV MODE
  //THIS HAS TO BE REMOVED ONCE THE APP IS DEPLOYED
  useEffect(() => {
    fetch("/welcome");
  });

  return (
    <>
      <h1 className="mx-auto mt-10 text-3xl">LOGIN TO SPOTIFY</h1>
      <h2 className="mx-auto">Please login</h2>
      <button
        className="mx-auto mt-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
          router.push(await RedirectSpotifyAction());
        }}
      >
        connect to spotify
      </button>
    </>
  );
}
