import type { PokemonDetails } from "../../api/pokemon";
import styles from "./PokemonDetailsCard.module.css";

export interface PokemonDetailsCardProps {
  pokemon: PokemonDetails;
  onBack: () => void;
}

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed",
};

function formatPokemonName(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatPokemonId(id: number) {
  return `#${String(id).padStart(3, "0")}`;
}

function artworkUrl(pokemon: PokemonDetails) {
  return (
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default ??
    ""
  );
}

export function PokemonDetailsCard({
  pokemon,
  onBack,
}: PokemonDetailsCardProps) {
  const imageUrl = artworkUrl(pokemon);

  return (
    <section className={styles.screen} aria-labelledby="pokemon-detail-title">
      <button className={styles.backButton} type="button" onClick={onBack}>
        Back to List
      </button>

      <article className={styles.card}>
        <header className={styles.header}>
          <h2 id="pokemon-detail-title" className={styles.title}>
            {formatPokemonName(pokemon.name)}
          </h2>
          <p className={styles.number}>{formatPokemonId(pokemon.id)}</p>
        </header>

        <div className={styles.body}>
          <div className={styles.mediaColumn}>
            <div className={styles.imageFrame}>
              {imageUrl ? (
                <img
                  className={styles.image}
                  src={imageUrl}
                  alt={formatPokemonName(pokemon.name)}
                />
              ) : null}
            </div>

            <div className={styles.typeList} aria-label="Pokemon types">
              {[...pokemon.types]
                .sort(
                  (firstType, secondType) => firstType.slot - secondType.slot,
                )
                .map((typeSlot) => (
                  <span className={styles.typeTag} key={typeSlot.type.name}>
                    {formatPokemonName(typeSlot.type.name)}
                  </span>
                ))}
            </div>

            <div className={styles.facts}>
              <div className={styles.fact}>
                <span className={styles.factLabel}>Height</span>
                <strong>{pokemon.height / 10} m</strong>
              </div>
              <div className={styles.fact}>
                <span className={styles.factLabel}>Weight</span>
                <strong>{pokemon.weight / 10} kg</strong>
              </div>
            </div>
          </div>

          <div className={styles.infoColumn}>
            <section aria-labelledby="base-stats-title">
              <h3 id="base-stats-title" className={styles.sectionTitle}>
                Base Stats
              </h3>
              <div className={styles.stats}>
                {pokemon.stats.map((stat) => (
                  <div className={styles.stat} key={stat.stat.name}>
                    <div className={styles.statHeader}>
                      <span>
                        {STAT_LABELS[stat.stat.name] ??
                          formatPokemonName(stat.stat.name)}
                      </span>
                      <strong>{stat.base_stat}</strong>
                    </div>
                    <div className={styles.statTrack}>
                      <span
                        className={styles.statBar}
                        style={{
                          width: `${Math.min(100, (stat.base_stat / 150) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section
              className={styles.abilities}
              aria-labelledby="abilities-title"
            >
              <h3 id="abilities-title" className={styles.sectionTitle}>
                Abilities
              </h3>
              <div className={styles.abilityList}>
                {pokemon.abilities.map((ability) => (
                  <span className={styles.ability} key={ability.ability.name}>
                    {formatPokemonName(ability.ability.name)}
                    {ability.is_hidden ? " (Hidden)" : ""}
                  </span>
                ))}
              </div>
            </section>

            <section className={styles.experience} aria-labelledby="xp-title">
              <h3 id="xp-title" className={styles.sectionTitle}>
                Base Experience
              </h3>
              <p className={styles.xp}>
                {pokemon.base_experience ?? "Unknown"} XP
              </p>
            </section>
          </div>
        </div>
      </article>
    </section>
  );
}
