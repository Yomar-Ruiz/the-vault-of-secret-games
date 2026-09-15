import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { getUserLibrary } from "../../lib/library";
import { getGamesByIds } from "../../lib/rawg";
import GameList from "../components/GameList";

export default async function LibraryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const library = await getUserLibrary(session.user.id);

  const gameIds = library.map(
    (game) => game.rawgGameId
  );

  const games = await getGamesByIds(gameIds);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold">
          My Library
        </h1>

        <p className="mt-2 text-zinc-400">
          {games.length} games in your library
        </p>

        <div className="mt-10">
          {games.length === 0 ? (
            <p className="text-zinc-400">
              Your library is empty.
            </p>
          ) : (
            <GameList games={games} />
          )}
        </div>
      </div>
    </main>
  );
}