import { usePokemonDetails } from "../../api/pokemonQueries";
import { PokemonDetailsCard } from "../../components/PokemonDetailsCard";
import styles from "./PokemonList.module.css";

export interface PokemonDetailsViewProps {
  pokemonId: number;
  onBack: () => void;
}

export function PokemonDetailsView({
  pokemonId,
  onBack,
}: PokemonDetailsViewProps) {
  const detailsQuery = usePokemonDetails(pokemonId);

  if (detailsQuery.isLoading) {
    return <p className={styles.loadingText}>Loading Pokemon...</p>;
  }

  if (detailsQuery.isError || !detailsQuery.data) {
    return <p className={styles.statusText}>Unable to load Pokemon.</p>;
  }

  return <PokemonDetailsCard pokemon={detailsQuery.data} onBack={onBack} />;
}
