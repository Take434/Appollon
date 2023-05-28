"use client";

import { testingAction } from "../../server-actions/test.action";
import { z } from "zod";
import { useEffect, useState } from "react";
import React from "react";
import { meResponseSchema } from "@/types/spotifyAuthTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const [profileData, setProfileData] = useState<z.infer<
    typeof meResponseSchema
  > | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    testingAction().then((data) => {
      if (data === "No token found") {
        console.log("No token found");
        push("/login");
        return;
      }
      setProfileData(data as z.infer<typeof meResponseSchema>);
    });
  }, [push]);

  return (
    <div>
      <h1>Welcome {profileData?.display_name}</h1>
      {profileData ? (
        <Image
          src={profileData.images[0].url}
          alt="the users profile picture"
          width={400}
          height={400}
        />
      ) : (
        <></>
      )}

      <p>Your data looks as follows: </p>
      <br />
      {JSON.stringify(profileData)}
    </div>
  );
}
