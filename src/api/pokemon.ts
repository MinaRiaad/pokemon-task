import { fetchPokeApi } from "./pokeApi";

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    other?: {
      "official-artwork"?: {
        front_default?: string | null;
      };
    };
    front_default?: string | null;
  };
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  abilities: Array<{
    ability: { name: string };
    is_hidden: boolean;
  }>;
}

export function getPokemonIdFromUrl(url: string) {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
}

export function getPokemonArtworkUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function listPokemon(
  params: { limit: number; offset: number },
  signal?: AbortSignal,
) {
  const search = new URLSearchParams({
    limit: String(params.limit),
    offset: String(params.offset),
  });

  return fetchPokeApi<PokemonListResponse>(
    `/pokemon?${search.toString()}`,
    signal,
  );
}

export function getPokemonDetails(id: number | string, signal?: AbortSignal) {
  return fetchPokeApi<PokemonDetails>(`/pokemon/${id}`, signal);
}
