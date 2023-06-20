"use client";

import { GithubIcon, SpotifyIcon } from "@/app/icons/BrandIcons";
import { RedirectSpotifyAction } from "@/server-actions/spotifyHandling.action";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ExternalLink, Eye, QuestionMarkCircle } from "../icons/Heroicons";

export default function Login() {
  const router = useRouter();

  //THIS IS A TEMPORARY FIX FOR A BUG ONLY HAPPENING IN DEV MODE
  //THIS HAS TO BE REMOVED ONCE THE APP IS DEPLOYED
  useEffect(() => {
    fetch("/welcome");
  });

  return (
    <>
      <div className="mx-auto mt-10 px-24 py-2 bg-primary rounded-xl border border-black">
        <h1 className="text-3xl text-textLight italic font-semibold">
          APOLLON
        </h1>
      </div>
      <div className="mx-10 text-textDark mt-10">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod magnam
        iure ipsum incidunt corporis libero, expedita ex veritatis repudiandae
        sequi!
      </div>

      <div className="grid grid-cols-16 grid-rows-16 mx-auto mt-20 aspect-[2/3] w-10/12">
        <div className="border border-textDark text-textDark text-center row-start-3 row-span-8 col-span-4 rounded-xl flex flex-col items-center pt-2">
          <Eye />
          <span className="rotate-90 w-max translate-y-20 text-2xl font-thin">
            Example Account
          </span>
        </div>
        <button className="border border-textDark text-textDark text-center row-span-4 col-start-6 col-span-11 rounded-xl">
          <SpotifyIcon />
          <span className="flex justify-center">
            Connect your account <ExternalLink />
          </span>
        </button>
        <div className="border border-textDark text-textDark text-center row-start-6 row-span-5 col-start-6 col-span-6 bg-slate-400 rounded-xl">
          3
        </div>
        <div className="border border-textDark text-textDark text-center row-start-7 row-span-3 col-start-13 col-span-4">
          4
        </div>
        <div className="border border-textDark text-textDark text-center row-start-13 row-span-3 col-start-2 col-span-5 flex flex-col rounded-xl justify-center items-center">
          <QuestionMarkCircle />
          About
        </div>
        <div className="border border-textDark text-textDark text-center row-start-12 row-span-5 col-start-9 col-span-8 flex flex-col rounded-xl items-center justify-center">
          <GithubIcon />
          <br />
          <span className="flex">
            View the code <ExternalLink />
          </span>
        </div>
      </div>

      {/* <button
        onClick={async () => {
          router.push(await RedirectSpotifyAction());
        }}
      >
        connect to spotify
      </button> */}
    </>
  );
}
