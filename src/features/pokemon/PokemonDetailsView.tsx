import { usePokemonDetails } from "../../api/pokemonQueries";
import { PokemonDetailsCard } from "../../components/PokemonDetailsCard";

export interface PokemonDetailsViewProps {
  pokemonId: number;
  onBack: () => void;
}

export function PokemonDetailsView({
  pokemonId,
  onBack,
}: PokemonDetailsViewProps) {
  const detailsQuery = usePokemonDetails(pokemonId);

  return <PokemonDetailsCard pokemon={detailsQuery.data} onBack={onBack} />;
}
