"use server";

import { getClient } from "@/prismaClient";
import { cookies } from "next/headers";

export const getUsersPalylistFromDB = async () => {
  const prisma = getClient();

  const token = cookies().get("token")?.value;

  const user = await prisma.user.findFirst({
    where: {
      token: token,
    },
    include: {
      playlists: {
        select: {
          id: true,
          title: true,
          creatorName: true,
          coverLink: true,
          audio_FeaturesId: true,
          _count: {
            select: {
               tracks: true,
            }
          }
        }
      }
    },
  });

  if (!user) {
    return "No user found";
  }

  return user.playlists.map(p => {
    return {
      id: p.id,
      title: p.title,
      creatorName: p.creatorName,
      coverLink: p.coverLink,
      audio_FeaturesId: p.audio_FeaturesId,
      trackCount: p._count.tracks,
    }
  });
};

export const getPlaylistInfowithId = async (id: string) => {
  const prisma = getClient();

  const token = cookies().get("token")?.value;
  
  if (!token) {
    return;
  }

  const playlist = await prisma.playlist.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      creatorName: true,
      coverLink: true,
      audio_FeaturesId: true,
      _count: {
        select: {
          tracks: true,
        }
      }
    }
  });

  if (!playlist) {
    return;
  }

  return {
    id: playlist.id,
    title: playlist.title,
    creatorName: playlist.creatorName,
    coverLink: playlist.coverLink,
    audio_FeaturesId: playlist.audio_FeaturesId,
    trackCount: playlist._count.tracks,
  };
};
