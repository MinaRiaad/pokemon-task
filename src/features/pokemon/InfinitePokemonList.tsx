import { useMemo } from "react";
import { useInfinitePokemonList } from "../../api/pokemonQueries";
import { InfiniteScroll } from "../../components/InfiniteScroll";
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
      loadMoreLabel="Load more Pokemon"
      loadingFallback={
        <div className={styles.loadMore}>
          <span className={styles.spinner} aria-hidden="true" />
          <span>Loading more Pokemon...</span>
        </div>
      }
      endMessage="You've reached the end of the Pokedex."
    >
      <VirtualPokemonGrid items={pokemon} onPokemonSelect={onPokemonSelect} />
    </InfiniteScroll>
  );
}
