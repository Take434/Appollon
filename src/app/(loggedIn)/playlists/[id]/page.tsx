import React from "react";

export default function Playlist({ params }: { params: { id: string } }) {
  return (
    <>
      <h1>Playlist {params.id}</h1>
    </>
  );
}
