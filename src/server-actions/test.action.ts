"use server";

import { z } from "zod";
import { zact } from "zact/server";
import { PrismaClient } from "@prisma/client";

/**
 * This is a test action that is used to test the server side actions.
 * @param input - The input to the action.
 * @returns The output of the action.
 */
export const validatedTestingAction = zact(
  z.object({ stuff: z.string().min(3) })
)(async (input) => {
  const prisma = new PrismaClient();
  const jonas = await prisma.user.findFirst({
    where: {
      name: "JONAS",
    },
  });

  return { message: `hello ${jonas?.email}  ${input.stuff}` };
});
