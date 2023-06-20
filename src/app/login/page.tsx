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
      <div className="mx-auto mt-10 px-24 py-2 bg-primary rounded border border-black">
        <h1 className="text-3xl text-textLight italic">APOLLON</h1>
      </div>
      <div className="mx-10 text-textDark mt-10">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod magnam iure ipsum incidunt corporis libero, expedita ex veritatis repudiandae sequi! Minima excepturi esse laborum voluptatum deleniti, ad asperiores tempore quisquam.
      </div>
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
