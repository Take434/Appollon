"use client";

import { apiArtist } from "@/models/apiModels/apiArtist";
import { apiArtistsObject } from "@/models/apiModels/apiArtistsObject";
import { apiTestingAction, apiUserArtistsAction } from "@/server-actions/apiTest.action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function Home() {

  const [artistsData, setArtistsData] = useState<z.infer<
    typeof apiArtistsObject
  > | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    apiUserArtistsAction().then((data) => {
      if (data === "No token found") {
        console.log("No token found");
        push("/login");
        return;
      }
      setArtistsData(data as z.infer<typeof apiArtistsObject>);
    });
  }, [push]);

  return (
    <div>
      <br/>
      {JSON.stringify(artistsData)}
    </div>
  );
}
