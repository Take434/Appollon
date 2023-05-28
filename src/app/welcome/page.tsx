"use client";

import { testingAction } from "../../server-actions/test.action";
import { z } from "zod";
import { useEffect, useState } from "react";
import React from "react";
import { meResponseSchema } from "@/types/spotifyAuthTypes";

export default function Welcome() {
  const [profileData, setProfileData] = useState<z.infer<
    typeof meResponseSchema
  > | null>(null);

  useEffect(() => {
    testingAction().then((data) => {
      setProfileData(data!);
    });
  }, []);

  return (
    <div>
      <h1>Welcome {profileData?.display_name}</h1>
      <img src={profileData?.images[0].url} />

      <p>Your data looks as follows: </p>
      <br />
      {JSON.stringify(profileData)}
    </div>
  );
}
