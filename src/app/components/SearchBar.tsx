export default function SearchBar() {
  return (
    <form
      action="/"
      method="GET"
      className="flex w-full max-w-2xl"
    >
      <input
        type="search"
        name="search"
        placeholder="Search games..."
        className="w-full rounded-l-xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-white outline-none placeholder:text-zinc-500 transition focus:border-zinc-500 focus:bg-zinc-800"
      />

      <button
        type="submit"
        className="rounded-r-xl bg-white px-7 py-4 font-semibold text-zinc-950 transition hover:bg-zinc-200"
      >
        Search
      </button>
    </form>
  );
}