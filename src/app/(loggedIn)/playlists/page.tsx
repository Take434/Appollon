"use client";

import Image from "next/image";
import React, { useEffect } from "react";

export default function PlaylistOverview() {
  const [playlists, setPlaylists] = React.useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setPlaylists([
        {
          id: "ThisIsAnId1",
          title: "teak-7",
          songCount: 10,
          creatorName: "Creator 1",
          coverImg: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        },
        {
          id: "ThisIsAnId2",
          title: "Playlist 2",
          songCount: 10,
          creatorName: "rdmcher",
          coverImg: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        },
        {
          id: "ThisIsAnId3",
          title: "Playlist 3",
          songCount: 10,
          creatorName: "aCoolName",
          coverImg: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        },
      ]);
    }, 1000);
  });

  return (
    <>
      <div className="text-textDark flex flex-col items-start ml-5">
        <h1 className="text-3xl">Anaylse your playlists</h1>
        <p>Select a playlist to analyse it</p>
      </div>
      <div className="flex flex-col mx-auto mt-3 text-textDark w-4/6">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="mt-12 w-full border border-textDark py-1 rounded-2xl"
          >
            <Image
              src={playlist.coverImg}
              alt="playlist cover"
              width={100}
              height={100}
              className="rounded-xl drop-shadow-cover absolute ml-3 -mt-10"
            />
            <div className="ml-32 pr-2">
              <h1>{playlist.title}</h1>
              <p>{playlist.songCount} songs</p>
              <p className="truncate">Creator: {playlist.creatorName}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
