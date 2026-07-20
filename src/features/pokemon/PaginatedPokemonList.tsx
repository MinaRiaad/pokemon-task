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
    Math.ceil(listQuery.data.count / POKEMON_PAGE_SIZE),
  );

  return (
    <>
      <PokemonGrid
        items={listQuery.data.results}
        isLoading={false}
        onPokemonSelect={onPokemonSelect}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <p className={styles.pageMeta}>
        Page {currentPage} of {totalPages} ({listQuery.data.count} Pokemon
        total)
      </p>
    </>
  );
}
