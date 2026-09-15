import GameCard from "./GameCard";
import type { Game } from "../types";

type GameListProps = {
  games: Game[];
  search?: string;
};

export default function GameList({
  games,
  search,
}: GameListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {games.map((game) => (
        <GameCard
          key={game.id}
          id={game.id}
          name={game.name}
          image={game.image}
          genres={game.genres}
          search={search}
        />
      ))}
    </div>
  );
}