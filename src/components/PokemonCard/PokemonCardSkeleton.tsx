import styles from "./PokemonCard.module.css";

export interface PokemonCardSkeletonProps {
  className?: string;
}

export function PokemonCardSkeleton({ className }: PokemonCardSkeletonProps) {
  const classNames = [styles.card, styles.skeletonCard, className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={classNames}
      aria-busy="true"
      aria-label="Loading Pokémon"
    >
      <div className={`${styles.imageFrame} ${styles.skeletonImage}`} />
      <div className={styles.skeletonCopy}>
        <span className={`${styles.skeletonLine} ${styles.skeletonLineWide}`} />
        <span
          className={`${styles.skeletonLine} ${styles.skeletonLineShort}`}
        />
      </div>
    </article>
  );
}
