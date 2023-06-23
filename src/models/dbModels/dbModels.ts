import { Playlist, Track, User } from "@prisma/client";

export type PlaylistWithTracks = Playlist & {
    tracks: Track,
};

export type UserWithPlaylists = User & {
    playlists: Playlist[],
};

export type PlaylistWithFollowers = Playlist & {
    followers: User[],
};