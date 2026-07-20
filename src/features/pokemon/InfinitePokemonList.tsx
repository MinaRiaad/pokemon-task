import { useMemo } from "react";
import { useInfinitePokemonList } from "../../api/pokemonQueries";
import { InfiniteScroll } from "../../components/InfiniteScroll";
import { PokemonGrid } from "../../components/PokemonGrid";
import styles from "./PokemonList.module.css";

export function InfinitePokemonList() {
  const infiniteQuery = useInfinitePokemonList();
  const pokemon = useMemo(
    () => infiniteQuery.data?.pages.flatMap((page) => page.results) ?? [],
    [infiniteQuery.data],
  );

  return (
    <InfiniteScroll
      className={styles.feed}
      hasMore={infiniteQuery.hasNextPage}
      isLoading={infiniteQuery.isFetchingNextPage}
      onLoadMore={() => {
        void infiniteQuery.fetchNextPage();
      }}
      loadingFallback={<PokemonGrid isLoading label="Loading more Pokemon" />}
      endMessage="You've reached the end of the Pokedex."
    >
      {infiniteQuery.isError ? (
        <p className={styles.statusText}>Unable to load Pokemon.</p>
      ) : null}
      <PokemonGrid items={pokemon} isLoading={infiniteQuery.isLoading} />
    </InfiniteScroll>
  );
}
