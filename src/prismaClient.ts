import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

export const getClient = () => {
  if (prisma) {
    return prisma;
  }

  prisma = new PrismaClient();
  return prisma;
};
