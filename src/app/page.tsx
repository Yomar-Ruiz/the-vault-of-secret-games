import GameList from "./components/GameList";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import { getGames } from "../lib/rawg";
import { auth } from "../auth";

type HomeProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
};

export default async function Home({
  searchParams,
}: HomeProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;

  const data = await getGames(
    params.search,
    page
  );

  const session = await auth();

  const hasResults = data.results.length > 0;

  return (
    <main className="min-h-screen bg-zinc-950">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-10">
        {session?.user && (
          <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Signed in as
            </p>

            <p className="mt-2 text-lg font-semibold text-white">
              {session.user.name ?? "User"}
            </p>

            <p className="text-sm text-zinc-400">
              {session.user.email}
            </p>
          </div>
        )}

        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
              {params.search
                ? "Search results"
                : "The collection"}
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
              {params.search
                ? `"${params.search}"`
                : "Discover Games"}
            </h2>
          </div>

          {hasResults && (
            <p className="text-sm text-zinc-500">
              {data.count.toLocaleString()} games found
            </p>
          )}
        </div>

        {hasResults ? (
          <>
            <GameList
              games={data.results}
              search={params.search}
            />

            <Pagination
              currentPage={page}
              hasNextPage={data.next !== null}
              hasPreviousPage={data.previous !== null}
              search={params.search}
            />
          </>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50">
            <div className="text-center">
              <div className="text-5xl">🎮</div>

              <h3 className="mt-4 text-2xl font-bold text-white">
                No games found
              </h3>

              <p className="mt-2 text-zinc-400">
                {params.search
                  ? `We couldn't find any games matching "${params.search}".`
                  : "There are no games to display right now."}
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}