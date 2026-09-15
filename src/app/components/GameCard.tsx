import Link from "next/link";

type GameCardProps = {
  id: number;
  name: string;
  image: string;
  genres: string[];
  search?: string;
};

export default function GameCard({
  id,
  name,
  image,
  genres,
  search,
}: GameCardProps) {
  const searchParam = search
    ? `?search=${encodeURIComponent(search)}`
    : "";

  return (
    <Link
      href={`/games/${id}${searchParam}`}
      className="group relative block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-zinc-600 hover:shadow-2xl"
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

        {/* Indicador */}
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-lg text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
          →
        </div>

        {/* Información */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur-sm"
              >
                {genre}
              </span>
            ))}
          </div>

          <h2 className="text-xl font-bold text-white drop-shadow-lg">
            {name}
          </h2>
        </div>
      </div>
    </Link>
  );
}