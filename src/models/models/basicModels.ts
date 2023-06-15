export type Playlist = {
    id: string;
    title: string;
    coverLink: string;
    creatorName: string;
    tracks: Track[];
}

export type User = {
    id: string;
    email: string;
    name: string;
    playlists: Playlist[];
    albums: Album[];
    pfpLink: string;
    isAdmin: boolean;
}

export type Album = {
    id: string;
    title: string;
    release: Date;
    songCount: number;
    coverLink: string;
    type: string;
    tracks: Track[];
    artist: Artist;
}

export type Artist = {
    id: string;
    name: string;
    albums: Album[];
}

export type Track = {
    id: string;
    title: string;
    album: Album;
    audio_features: AudioFeature;
}

export type AudioFeature = {
    duration_ms: number;
    instrumentalness: number;
    loudness: number;
    tempo: number;
    danceability: number;
    energy: number;
    valence: number;
}