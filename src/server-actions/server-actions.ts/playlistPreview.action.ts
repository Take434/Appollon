"use server";

import { Playlist, User } from "@prisma/client";
import { getPlaylistsForUser } from "../api-actions.ts/getPlaylistsForUser.action";
import { getClient } from "@/prismaClient";
import { cookies } from "next/headers";
import { PlaylistWithFollowers } from "@/models/dbModels/dbModels";

export const playlistPreview = async () => {

  const prisma = getClient();

  const token = cookies().get("token")?.value;

  if (!token) {
    return "No token found";
  }

  const currentUser = await prisma.user.findFirst({
    where: {
      token: token
    },
    include: {
      playlists: true,
    },
  });

  if(!currentUser) {
    console.log("No user found");
    return;
  }

  const playlists: Playlist[] = [];

  if(currentUser.playlists.length > 0) {
    console.log("getting from db");
    
    playlists.push(...currentUser.playlists);
  }
  else {
    console.log("getting from api");

    const apiPlaylists = await getPlaylistsForUser();

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

    apiPlaylists.forEach(apiP => {
      const found = playlistsInDb.find(dbP => dbP.id === apiP.id);
      if(found) {
        const newFollowers: User[] = found.followers.concat([currentUser]);
        const newPlaylist: Playlist = {
          coverLink: found.coverLink,
          creatorName: found.creatorName,
          id: found.id,
          title: found.title,
        };
        playlistsToUpdate.push(newPlaylist);
      }
      else {
        const newPlaylist: Playlist = {
          coverLink: apiP.coverLink,
          creatorName: apiP.creatorName,
          id: apiP.id,
          title: apiP.title,
        };
        playlistsToCreate.push(newPlaylist)
      }
    });

    const createPlaylists = await prisma.playlist.createMany({
      data: playlistsToCreate
    });

    const updatePlaylists = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        playlists: {
          connect: playlistsToUpdate.map(item => ( {id: item.id} )),
        }
      },
      include: {
        playlists: true,
      }
    })

    console.log(createPlaylists);

    playlists.push(...apiPlaylists)
  }

  return playlists;
}