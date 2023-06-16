import { Playlist, Track } from "@prisma/client";

export type PlaylistWithTracks = Playlist & {
    tracks: Track,
};

