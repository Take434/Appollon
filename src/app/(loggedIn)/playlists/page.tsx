"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { getUsersPalylistFromDB } from "../../../server-actions/playlistOverview.action";
import { useRouter } from "next/navigation";
import { playlistPreview } from "@/server-actions/playlistPreview.action";
import { LoadingComponent } from "@/components/loading";
import { Playlist } from "@prisma/client";

export default function PlaylistOverview() {
  const [playlists, setPlaylists] = React.useState<(Playlist & { trackCount: number })[]>([]);
  const router = useRouter();

  const getPlaylists = async () => {
    const ps = await getUsersPalylistFromDB();

    if (ps === "No user found") {
      console.log("No user found");
      router.push("/login");
      return;
    }

    setPlaylists(ps);
  };

  useEffect(() => {
    getPlaylists();
  }, [router]);

  const handlePlaylistClick = async () => {
    setPlaylists([]);

    const data = await playlistPreview();
    if (data === "No token found") {
      console.log("No token found");
      router.push("/login");
      return;
    }

    if (!data) {
      return;
    }

    getPlaylists();
  };

  return (
    <>
      <div className="text-textDark flex flex-col items-start ml-5">
        <h1 className="text-3xl">Anaylse your playlists</h1>
        <p>Select a playlist to analyse it</p>
      </div>
      <div className="flex flex-col mx-auto mt-3 text-textDark w-4/6 mb-20">
        <button
          className="border border-textDark rounded-xl px-2 py-1"
          onClick={() => handlePlaylistClick()}
        >
          query my spotify playlists
        </button>
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="mt-12 w-full border border-textDark py-1 rounded-2xl"
            onClick={() => router.push(`/playlists/${playlist.id}`)}
          >
            <Image
              src={playlist.coverLink}
              alt="playlist cover"
              width={100}
              height={100}
              className="rounded-xl drop-shadow-cover absolute ml-3 -mt-10"
            />
            <div className="ml-32 pr-2">
              <h1 className="truncate">
                {playlist.title ? playlist.title : "unnamed Playlist"}
              </h1>
              <p>{playlist.trackCount} songs</p>
              <p className="truncate">Creator: {playlist.creatorName}</p>
            </div>
          </div>
        ))}
        {playlists.length === 0 && (
          <div className="text-textDark mt-20">
            <LoadingComponent />
          </div>
        )}
      </div>
    </>
  );
}
