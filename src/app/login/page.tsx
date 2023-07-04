"use client";

import { GithubIcon, SpotifyIcon } from "@/components/icons/BrandIcons";
import { RedirectSpotifyAction } from "@/server-actions/spotifyHandling.action";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  ArrowTopRightOnSquareIcon,
  EyeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { ApollonIcon } from "@/components/icons/ApollonIcons";
import { isUserLoggedIn } from "@/server-actions/loginInfo.action";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    //THIS IS A TEMPORARY FIX FOR A BUG ONLY HAPPENING IN DEV MODE
    //THIS HAS TO BE REMOVED ONCE THE APP IS DEPLOYED
    fetch("/home");

    (async () => {
      if (await isUserLoggedIn()) {
        router.push("/home");
      }
    })();
  });

  return (
    <>
      <div className="mx-auto mt-10 px-24 py-2 bg-primary rounded-xl border border-black">
        <h1 className="text-3xl text-textLight italic font-semibold">
          APOLLON
        </h1>
      </div>
      <div className="lg:mx-auto mx-10 text-textDark mt-2">
        Discover your music taste! Connect with Spotify to explore favorite
        genres and analyze playlists for a deeper understanding of your musical
        journey.
      </div>

      <div className="grid grid-cols-16 grid-rows-16 mx-5 mt-10 aspect-square max-w-lg md:mx-auto">
        <div className="border border-textDark text-textDark text-center row-start-3 row-span-8 col-span-4 rounded-xl flex flex-col items-center pt-2 justify-center">
          <EyeIcon className="w-6 h-6 mb-2" />
          <span className="vertical-rl">Preview App</span>
        </div>
        <button
          className="border border-textDark text-textDark text-center row-span-4 col-start-6 col-span-11 rounded-xl"
          onClick={async () => {
            router.push(await RedirectSpotifyAction());
          }}
        >
          <SpotifyIcon className="mx-auto mb-1" />
          <span className="flex justify-center">
            Connect
            <ArrowTopRightOnSquareIcon className="w-6 h-6 ml-3" />
          </span>
        </button>
        <div className="row-start-6 row-span-5 col-start-6 col-span-6">
          <ApollonIcon width={200} height={200} />
        </div>
        <div className="border border-textDark text-textDark text-center row-start-7 row-span-3 col-start-13 col-span-4 rounded-xl"></div>
        <button
          className="border border-textDark text-textDark text-center row-start-13 row-span-3 col-start-2 col-span-5 flex flex-col rounded-xl justify-center items-center"
          onClick={() => router.push("/about")}
        >
          <QuestionMarkCircleIcon className="w-6 h-6" />
          About
        </button>
        <button
          className="border border-textDark text-textDark text-center row-start-12 row-span-5 col-start-9 col-span-8 flex flex-col rounded-xl items-center justify-center"
          onClick={() => router.push("https://github.com/Take434/Apollon")}
        >
          <GithubIcon className="w-14 h-14" />
          <span className="flex">
            View the code{" "}
            <ArrowTopRightOnSquareIcon className="w-4 h-4 my-auto ml-2" />
          </span>
        </button>
      </div>
    </>
  );
}
