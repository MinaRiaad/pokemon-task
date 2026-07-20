import {
  getPokemonArtworkUrl,
  getPokemonIdFromUrl,
  type PokemonListItem,
} from "../../api/pokemon";
import { POKEMON_PAGE_SIZE } from "../../api/pokemonQueries";
import { PokemonCard, PokemonCardSkeleton } from "../PokemonCard";
import styles from "./PokemonGrid.module.css";

export interface PokemonGridProps {
  items?: PokemonListItem[];
  isLoading: boolean;
  label?: string;
  onPokemonSelect?: (id: number) => void;
}

export function PokemonGrid({
  items = [],
  isLoading,
  label = "Pokemon list",
  onPokemonSelect,
}: PokemonGridProps) {
  return (
    <section className={styles.grid} aria-label={label}>
      {isLoading
        ? Array.from({ length: POKEMON_PAGE_SIZE }, (_, index) => (
            <PokemonCardSkeleton key={index} />
          ))
        : items.map((item) => {
            const id = getPokemonIdFromUrl(item.url);
            if (!id) return null;

            return (
              <PokemonCard
                key={item.url}
                id={id}
                name={item.name}
                imageUrl={getPokemonArtworkUrl(id)}
                onClick={onPokemonSelect}
              />
            );
          })}
    </section>
  );
}
