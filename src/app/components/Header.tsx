import Link from "next/link";
import { auth } from "../../auth";
import SearchBar from "./SearchBar";
import AuthButton from "./AuthButton";

export default async function Header() {
  const session = await auth();

  return (
    <header className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <nav className="flex items-center justify-between border-b border-zinc-800/60 py-5">
          <Link
            href="/"
            className="text-sm font-black uppercase tracking-[0.3em] text-white transition hover:text-zinc-300"
          >
            The Vault
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/library"
              className="rounded-xl border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
            >
              My Library
            </Link>

            <AuthButton
              isLoggedIn={!!session?.user}
            />
          </div>
        </nav>

        <div className="max-w-3xl py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-400">
            The Vault
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
            Your next
            <span className="block text-zinc-400">
              game is waiting.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
            Discover games, explore new worlds and find your
            next favorite adventure.
          </p>

          <div className="mt-8">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}