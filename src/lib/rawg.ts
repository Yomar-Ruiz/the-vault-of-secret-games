import type {
  Game,
  RawgGamesResponse,
  RawgGameDetails,
} from "@/app/type";

const RAWG_BASE_URL = "https://api.rawg.io/api";

type GamesResult = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
};

export async function getGames(
  search?: string,
  page: number = 1
): Promise<GamesResult> {
  const apiKey = process.env.RAWG_API_KEY;

  const searchParam = search
    ? `&search=${encodeURIComponent(search)}`
    : "";

  const response = await fetch(
    `${RAWG_BASE_URL}/games?key=${apiKey}&page=${page}${searchParam}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener los juegos");
  }

  const data: RawgGamesResponse = await response.json();

  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: data.results.map((game) => ({
      id: game.id,
      name: game.name,
      image: game.background_image ?? "",
      genres: game.genres.map(
        (genre) => genre.name
      ),
    })),
  };
}

export async function getGame(
  id: string
): Promise<RawgGameDetails> {
  const apiKey = process.env.RAWG_API_KEY;

  const response = await fetch(
    `${RAWG_BASE_URL}/games/${id}?key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener el juego");
  }

  const data: RawgGameDetails = await response.json();

  return data;
}

export async function getGamesByIds(
  ids: number[]
): Promise<Game[]> {
  if (ids.length === 0) {
    return [];
  }

  const results = await Promise.all(
    ids.map(async (id) => {
      const game = await getGame(String(id));

      return {
        id: game.id,
        name: game.name,
        image: game.background_image ?? "",
        genres: game.genres.map(
          (genre) => genre.name
        ),
      };
    })
  );

  return results;
}