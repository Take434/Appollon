"use server";

import { zact } from "zact/server";
import { PrismaClient } from "@prisma/client";
import { apiUser } from "@/models/apiModels/apiUser";

/**
 * This is a test action that is used to test the server side actions.
 * @param input - The input to the action.
 * @returns The output of the action.
 */
export const parseUserInput = zact(apiUser)(async (input) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.create({
    data: {
      id: input.id,
      email: input.email,
      name: input.displayName,
      pfpLink: input.images.url,
      isAdmin: false,
      refreshToken: "",
      token: "",
    },
  });

  return { message: `hello ${user.email}  ${user.name}` };
});

// export const parseArtistInput = zact(apiArtist)(async (input) => {
//   const prisma = new PrismaClient();

//   const artist = await prisma.artist.create({
//     data: {
//       id: input.id,
//       name: input.name,
//     }
//   })
// });
