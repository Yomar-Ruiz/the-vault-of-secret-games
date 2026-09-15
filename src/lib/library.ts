import { prisma } from "./prisma";

export async function addGameToLibrary(
  userId: string,
  rawgGameId: number
) {
  return prisma.libraryGame.create({
    data: {
      userId,
      rawgGameId,
    },
  });
}

export async function isGameInLibrary(
  userId: string,
  rawgGameId: number
) {
  const game = await prisma.libraryGame.findUnique({
    where: {
      userId_rawgGameId: {
        userId,
        rawgGameId,
      },
    },
  });

  return game !== null;
}

export async function getUserLibrary(
  userId: string
) {
  return prisma.libraryGame.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}