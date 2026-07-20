import styles from "./PokemonCard.module.css";

export interface PokemonCardProps {
  id: number;
  name: string;
  imageUrl: string;
  onClick?: (id: number) => void;
  isSelected?: boolean;
  className?: string;
}

function formatPokemonId(id: number) {
  return `#${String(id).padStart(3, "0")}`;
}

export function PokemonCard({
  id,
  name,
  imageUrl,
  onClick,
  isSelected = false,
  className,
}: PokemonCardProps) {
  const content = (
    <>
      <div className={styles.imageFrame}>
        <img
          className={styles.image}
          src={imageUrl}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className={styles.copy}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.number}>{formatPokemonId(id)}</p>
      </div>
    </>
  );

  const classNames = [
    styles.card,
    isSelected ? styles.selected : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (onClick) {
    return (
      <button
        type="button"
        className={classNames}
        onClick={() => onClick(id)}
        aria-pressed={isSelected}
      >
        {content}
      </button>
    );
  }

  return <article className={classNames}>{content}</article>;
}
