"use server";

import { auth } from "../../auth";
import { addGameToLibrary } from "../../lib/library";

export async function addGameAction(
  rawgGameId: number
): Promise<void> {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Debes iniciar sesión");
  }

  await addGameToLibrary(
    session.user.id,
    rawgGameId
  );
}