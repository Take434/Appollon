"use client";

import { apiArtist } from "@/models/apiModels/apiArtist";
import { apiTestingAction } from "@/server-actions/apiTest.action";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";

export default function Home() {
  const [artistData, setArtistData] = useState<z.infer<
    typeof apiArtist
  > | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    apiTestingAction().then((data) => {
      if (data === "No token found") {
        console.log("No token found");
        push("/login");
        return;
      }
      setArtistData(data as z.infer<typeof apiArtist>);
    });
  }, [push]);

  return (
    <div>
      <br />
      {JSON.stringify(artistData)}
    </div>
  );
}
