"use server";

import { z } from 'zod';
import { zact } from 'zact/server';
import { PrismaClient } from '@prisma/client';

export const validatedTestingAction = zact(z.object({ stuff: z.string().min(3) }))(
  async (input) => {

    const prisma = new PrismaClient();
    const jonas = await prisma.user.findFirst({
      where: {
        name: "JONAS"
      }
    });

    return { message: `hello ${jonas?.email}  ${input.stuff}` };
  }
);
