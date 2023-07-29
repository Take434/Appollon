"use client";

import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { SmallPlaylistPreview } from "@/app/(loggedIn)/home/SmallPlaylistPreview";
import { getUserData } from "@/server-actions/getUserData.action";
import { LoadingComponent } from "@/components/loading";
import { Playlist, User } from "@prisma/client";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Welcome() {
  const [profileData, setProfileData] = useState<
    (User & { playlists: Playlist[] }) | null
  >(null);
  const [userStats, setUserStats] = useState<any>(null); //TODO: [z.infer<typeof userStatsSchema>]
  const [userPlaylists, setUserPlaylists] = useState<any>(null); // TODO: [z.infer<typeof playlistSchema>
  const { push } = useRouter();

  useEffect(() => {
    getUserData().then((data) => {
      if (!data) {
        console.log("No token found");
        push("/login");
        return;
      }
      setProfileData(data as User & { playlists: Playlist[] });
    });

    const chartColors = [
      getComputedStyle(document.body).getPropertyValue("--color-secondary-800"),
      getComputedStyle(document.body).getPropertyValue("--color-secondary-700"),
      getComputedStyle(document.body).getPropertyValue("--color-secondary-600"),
      getComputedStyle(document.body).getPropertyValue("--color-secondary-500"),
      getComputedStyle(document.body).getPropertyValue("--color-secondary-400"),
      getComputedStyle(document.body).getPropertyValue("--color-secondary-300"),
      getComputedStyle(document.body).getPropertyValue("--color-secondary-200"),
      getComputedStyle(document.body).getPropertyValue("--color-secondary-100"),
    ];

    setUserStats({
      labels: ["Metal", "Alternative Rock", "J-Rock", "Funk", "Post-Punk"],
      datasets: [
        {
          label: "# of Songs",
          data: [20, 17, 10, 8, 5],
          backgroundColor: chartColors,
          hoverBackgroundColor: chartColors,
          borderColor: [
            getComputedStyle(document.body).getPropertyValue(
              "--color-text-dark"
            ),
          ],
          borderWidth: 1,
        },
      ],
    });

    setUserPlaylists([
      <SmallPlaylistPreview
        key={0}
        playlistName="Favorites"
        playlistImage="https://wiki.dave.eu/images/4/47/Placeholder.png"
        playlistNav={() => console.log("Favorites")}
      />,
      <SmallPlaylistPreview
        key={1}
        playlistName="Favorites"
        playlistImage="https://wiki.dave.eu/images/4/47/Placeholder.png"
        playlistNav={() => console.log("Favorites")}
      />,
      <SmallPlaylistPreview
        key={2}
        playlistName="Favorites"
        playlistImage="https://wiki.dave.eu/images/4/47/Placeholder.png"
        playlistNav={() => console.log("Favorites")}
      />,
    ]);
  }, [push]);

  return (
    <div className="text-textDark flex flex-col items-center">
      {profileData ? (
        <>
          <Image
            src={profileData.pfpLink ? profileData.pfpLink : "/placeholder.png"}
            alt="the users profile picture"
            width={150}
            height={150}
            className="rounded-2xl border border-textLight drop-shadow-cover -z-10"
          />
          <h1 className="text-3xl">Hi, {profileData.name}</h1>
          <div className="max-w-xl w-11/12 aspect-square py-2">
            <Doughnut
              data={userStats}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: getComputedStyle(document.body).getPropertyValue(
                        "--color-text-dark"
                      ),
                    },
                  },
                },
              }}
            />
          </div>
          <div className="flex flex-col w-4/5">
            <span className="flex">
              Your Playlists
              <ArrowTopRightOnSquareIcon className="w-6 h-6 ml-2" />
            </span>
            <div className="border border-textDark py-2 px-5 w-full h-44 rounded-2xl flex flex-col justify-between mb-20 drop-shadow-cover bg-linear-gradient">
              {userPlaylists}
            </div>
          </div>
        </>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
}
