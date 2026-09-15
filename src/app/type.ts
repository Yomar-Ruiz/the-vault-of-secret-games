export type Game = {
  id: number;
  name: string;
  image: string;
  genres: string[];
};

export type RawgGame = {
  id: number;
  name: string;
  background_image: string | null;
  genres: {
    id: number;
    name: string;
  }[];
};

export type RawgGamesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawgGame[];
};

export type RawgGameDetails = {
  id: number;
  name: string;
  description: string;
  background_image: string | null;
  rating: number;
  released: string | null;
  genres: {
    id: number;
    name: string;
  }[];
  platforms: {
    platform: {
      id: number;
      name: string;
    };
  }[];
};