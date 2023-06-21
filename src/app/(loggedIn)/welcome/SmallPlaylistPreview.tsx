import Image from "next/image";
import React from "react";

type SmallPlaylistPreviewProps = {
  playlistName: string;
  playlistImage: string;
  playlistNav: () => void;
};

export const SmallPlaylistPreview = (props: SmallPlaylistPreviewProps) => {
  return (
    <button
      className="flex items-center"
      onClick={() => {
        props.playlistNav();
      }}
    >
      <Image
        src={props.playlistImage}
        alt="playlist cover"
        width={50}
        height={50}
        className="border border-textDark mr-3"
      />
      <h1>{props.playlistName}</h1>
    </button>
  );
};
