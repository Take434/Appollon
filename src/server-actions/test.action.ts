"use server";

import { z } from 'zod';
import { zact } from 'zact/server';
export const validatedTestingAction = zact(z.object({ stuff: z.string().min(3) }))(
  async (input) => {
    return { message: `hello ${input.stuff} your number is ${Math.round(Math.random() * 100)}` };
  }
);
