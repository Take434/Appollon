"use client";

import { apiArtist } from "@/models/apiModels/apiArtist";
import { apiArtistsObject } from "@/models/apiModels/apiArtistsObject";
import { apiSavedTracks } from "@/models/apiModels/apiSavedTracks";
import { apiTestingAction, apiUserArtistsAction, getSavedTracks } from "@/server-actions/apiTest.action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function Home() {

  const [displayData, setDisplayData] = useState<z.infer<
    typeof apiArtistsObject
  > | z.infer<
  typeof apiArtist
  > | z.infer<
  typeof apiSavedTracks
  > | null>(null);

  const { push } = useRouter();

  return (
    <div>
      <button onClick={() => {
        apiUserArtistsAction().then((data) => {
          if (data === "No token found") {
            console.log("No token found");
            push("/login");
            return;
          }
          setDisplayData(data as z.infer<typeof apiArtistsObject>);
        });
      }
      }>artistsUser</button>
      <button onClick={() => {
        apiTestingAction().then((data) => {
          if (data === "No token found") {
            console.log("No token found");
            push("/login");
            return;
          }
          setDisplayData(data as z.infer<typeof apiArtist>);
        });
      }}>artist</button>
      <button onClick={() => {
        getSavedTracks().then((data) => {
          if (data === "No token found") {
            console.log("No token found");
            push("/login");
            return;
          }
          setDisplayData(data as z.infer<typeof apiSavedTracks>);
        });
      }}>savedTracks</button>
      <br/>
      { JSON.stringify(displayData)}
    </div>
  );
}
