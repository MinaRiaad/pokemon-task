import { POKEMON_PAGE_SIZE, usePokemonList } from "../../api/pokemonQueries";
import { Pagination } from "../../components/Pagination";
import { PokemonGrid } from "../../components/PokemonGrid";
import styles from "./PokemonList.module.css";

export interface PaginatedPokemonListProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  onPokemonSelect: (id: number) => void;
}

export function PaginatedPokemonList({
  currentPage,
  onPageChange,
  onPokemonSelect,
}: PaginatedPokemonListProps) {
  const listQuery = usePokemonList(currentPage);
  const totalPages = Math.max(
    1,
    Math.ceil((listQuery.data?.count ?? 0) / POKEMON_PAGE_SIZE),
  );

  return (
    <>
      {listQuery.isError ? (
        <p className={styles.statusText}>Unable to load Pokemon.</p>
      ) : null}
      <PokemonGrid
        items={listQuery.data?.results}
        isLoading={listQuery.isLoading || !listQuery.data}
        onPokemonSelect={onPokemonSelect}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <p className={styles.pageMeta}>
        Page {currentPage} of {totalPages} ({listQuery.data?.count ?? 0} Pokemon
        total)
      </p>
    </>
  );
}
