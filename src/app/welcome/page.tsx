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
      <h1>Welcome</h1>
      {JSON.stringify(profileData)}
    </div>
  );
}
