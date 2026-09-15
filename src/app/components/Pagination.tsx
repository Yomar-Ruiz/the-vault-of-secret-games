type PaginationProps = {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  search?: string;
};

export default function Pagination({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  search,
}: PaginationProps) {
  const searchParam = search
    ? `&search=${encodeURIComponent(search)}`
    : "";

  return (
    <nav className="mt-14 flex items-center justify-center gap-3">
      {hasPreviousPage ? (
        <a
          href={`/?page=${currentPage - 1}${searchParam}`}
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
        >
          ← Previous
        </a>
      ) : (
        <span className="cursor-not-allowed rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-3 text-sm font-medium text-zinc-600">
          ← Previous
        </span>
      )}

      <div className="flex h-11 min-w-11 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 px-4 text-sm font-semibold text-white">
        {currentPage}
      </div>

      {hasNextPage ? (
        <a
          href={`/?page=${currentPage + 1}${searchParam}`}
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
        >
          Next →
        </a>
      ) : (
        <span className="cursor-not-allowed rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-3 text-sm font-medium text-zinc-600">
          Next →
        </span>
      )}
    </nav>
  );
}