import { useMemo } from "react";
import { useInfinitePokemonList } from "../../api/pokemonQueries";
import { InfiniteScroll } from "../../components/InfiniteScroll";
import { PokemonGrid } from "../../components/PokemonGrid";
import { VirtualPokemonGrid } from "../../components/VirtualPokemonGrid";
import styles from "./PokemonList.module.css";

export interface InfinitePokemonListProps {
  onPokemonSelect: (id: number) => void;
}

export function InfinitePokemonList({
  onPokemonSelect,
}: InfinitePokemonListProps) {
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
      loadingFallback={
        <div className={styles.loadMore}>
          <span className={styles.spinner} aria-hidden="true" />
          <span>Loading more Pokemon...</span>
        </div>
      }
      endMessage="You've reached the end of the Pokedex."
    >
      {infiniteQuery.isError ? (
        <p className={styles.statusText}>Unable to load Pokemon.</p>
      ) : null}
      {infiniteQuery.isLoading ? (
        <PokemonGrid isLoading />
      ) : (
        <VirtualPokemonGrid items={pokemon} onPokemonSelect={onPokemonSelect} />
      )}
    </InfiniteScroll>
  );
}
