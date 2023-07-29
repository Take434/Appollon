"use server";

import { Playlist, User } from "@prisma/client";
import { getPlaylistsForUser } from "../utils/api-utils/getPlaylistsForUser.util";
import { getClient } from "@/prismaClient";
import { cookies } from "next/headers";
import { spotifyRequestWrapper } from "@/utils/spotifyUtils";
import { addCompletePlaylistToDb } from "@/utils/getTracks.util";

export const playlistPreview = async () => {
  const time = Date.now();
  const prisma = getClient();

  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const currentUser = await prisma.user.findFirst({
    where: {
      token: token,
    },
    include: {
      playlists: {
        include: {
          tracks: true,
        },
      },
    },
  });

  if (!currentUser) {
    console.log("No user found");
    return;
  }

  const playlists: Playlist[] = [];

  console.log("getting from api");

  const apiPlaylists = await spotifyRequestWrapper(getPlaylistsForUser);

  if (apiPlaylists === "No token found") {
    console.log("No token found");
    return;
  }

  if (!apiPlaylists) {
    console.log("No playlists found");
    return;
  }

  const playlistsToCreate: Playlist[] = [];
  const playlistsToUpdate: Playlist[] = [];

  const playlistsInDb = await prisma.playlist.findMany({
    include: {
      followers: true,
    },
  });

  apiPlaylists.forEach((apiP) => {
    const found = playlistsInDb.find((dbP) => dbP.id === apiP.id);
    if (found) {
      const newFollowers: User[] = found.followers.concat([currentUser]);
      const newPlaylist: Playlist = {
        coverLink: found.coverLink,
        creatorName: found.creatorName,
        id: found.id,
        title: found.title,
        audio_FeaturesId: null,
      };
      playlistsToUpdate.push(newPlaylist);
    } else {
      const newPlaylist: Playlist = {
        coverLink: apiP.coverLink,
        creatorName: apiP.creatorName,
        id: apiP.id,
        title: apiP.title,
        audio_FeaturesId: null,
      };
      playlistsToCreate.push(newPlaylist);
    }
  });

  const createPlaylists = await prisma.playlist.createMany({
    data: playlistsToCreate,
  });

  const updatePlaylists = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      playlists: {
        connect: playlistsToUpdate
          .concat(playlistsToCreate)
          .map((item) => ({ id: item.id })),
      },
    },
    include: {
      playlists: true,
    },
  });

  playlists.push(...apiPlaylists);

  console.log("done in ", Date.now() - time);
  return playlists;
};

export const addCompletePlaylistToDbAction = async (id: string) => {
  const time = Date.now();
  try {
    await spotifyRequestWrapper(() => addCompletePlaylistToDb(id));
    console.log("done in ", Date.now() - time);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
