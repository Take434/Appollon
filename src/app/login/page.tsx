"use client";

import { GithubIcon, SpotifyIcon } from "@/components/icons/BrandIcons";
import { RedirectSpotifyAction } from "@/server-actions/spotifyHandling.action";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  ExternalLink,
  Eye,
  QuestionMarkCircle,
} from "@/components/icons/Heroicons";

export default function Login() {
  const router = useRouter();

  //THIS IS A TEMPORARY FIX FOR A BUG ONLY HAPPENING IN DEV MODE
  //THIS HAS TO BE REMOVED ONCE THE APP IS DEPLOYED
  useEffect(() => {
    fetch("/home");
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

      <div className="grid grid-cols-16 grid-rows-16 mx-5 mt-20 aspect-square max-w-lg">
        <div className="border border-textDark text-textDark text-center row-start-3 row-span-8 col-span-4 rounded-xl flex flex-col items-center pt-2 justify-evenly">
          <Eye className="w-6 h-6" />
          <span className="vertical-rl">Example Account</span>
        </div>
        <button
          className="border border-textDark text-textDark text-center row-span-4 col-start-6 col-span-11 rounded-xl"
          onClick={async () => {
            router.push(await RedirectSpotifyAction());
          }}
        >
          <SpotifyIcon className="mx-auto mb-1" />
          <span className="flex justify-center">
            Connect your account <ExternalLink className="w-6 h-6" />
          </span>
        </button>
        <div className="border border-textDark text-textDark text-center row-start-6 row-span-5 col-start-6 col-span-6 bg-slate-400 rounded-xl">
          3
        </div>
        <div className="border border-textDark text-textDark text-center row-start-7 row-span-3 col-start-13 col-span-4 rounded-xl">
          4
        </div>
        <div className="border border-textDark text-textDark text-center row-start-13 row-span-3 col-start-2 col-span-5 flex flex-col rounded-xl justify-center items-center">
          <QuestionMarkCircle className="w-6 h-6" />
          About
        </div>
        <div className="border border-textDark text-textDark text-center row-start-12 row-span-5 col-start-9 col-span-8 flex flex-col rounded-xl items-center justify-center">
          <GithubIcon className="w-6 h-6" />
          <br />
          <span className="flex">
            View the code <ExternalLink className="w-6 h-6" />
          </span>
        </div>
      </div>
    </>
  );
}
