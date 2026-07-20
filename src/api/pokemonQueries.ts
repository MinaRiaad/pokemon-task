import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getPokemonDetails, listPokemon } from "./pokemon";

export const POKEMON_PAGE_SIZE = 20;

export function usePokemonList(page: number) {
  const currentPage = Math.max(1, page);
  const offset = (currentPage - 1) * POKEMON_PAGE_SIZE;

  return useSuspenseQuery({
    queryKey: ["pokemon", "list", { limit: POKEMON_PAGE_SIZE, offset }],
    queryFn: ({ signal }) =>
      listPokemon({ limit: POKEMON_PAGE_SIZE, offset }, signal),
  });
}

export function useInfinitePokemonList() {
  return useSuspenseInfiniteQuery({
    queryKey: ["pokemon", "infinite", { limit: POKEMON_PAGE_SIZE }],
    initialPageParam: 0,
    queryFn: ({ pageParam, signal }) =>
      listPokemon({ limit: POKEMON_PAGE_SIZE, offset: pageParam }, signal),
    getNextPageParam: (lastPage, _pages, lastOffset) =>
      lastPage.next ? lastOffset + POKEMON_PAGE_SIZE : undefined,
  });
}

export function usePokemonDetails(id: number | string) {
  return useSuspenseQuery({
    queryKey: ["pokemon", "details", id],
    queryFn: ({ signal }) => getPokemonDetails(id, signal),
  });
}
