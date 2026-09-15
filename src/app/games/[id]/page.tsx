import Link from "next/link";
import { getGame } from "../../../lib/rawg";
import AddToLibraryButton from "../../components/AddToLibraryButton";

type GamePageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function GamePage({
  params,
  searchParams,
}: GamePageProps) {
  const { id } = await params;
  const { search } = await searchParams;

  const game = await getGame(id);

  const backUrl = search
    ? `/?search=${encodeURIComponent(search)}`
    : "/";

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link
          href={backUrl}
          className="mb-8 inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900 hover:text-white"
        >
          ← Back to catalog
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <img
              src={game.background_image ?? ""}
              alt={game.name}
              className="h-[500px] w-full rounded-2xl object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold tracking-tight">
              {game.name}
            </h1>

            <div className="mt-6 flex flex-wrap gap-4 text-zinc-300">
              <span>⭐ {game.rating}</span>
              <span>
                📅 {game.released ?? "Unknown"}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {game.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <AddToLibraryButton gameId={game.id} />

            <div className="mt-8">
              <h2 className="text-2xl font-bold">
                About this game
              </h2>

              <div
                className="mt-4 space-y-4 leading-7 text-zinc-400"
                dangerouslySetInnerHTML={{
                  __html: game.description,
                }}
              />
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold">
                Platforms
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {game.platforms.map((item) => (
                  <span
                    key={item.platform.id}
                    className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-zinc-300"
                  >
                    {item.platform.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}