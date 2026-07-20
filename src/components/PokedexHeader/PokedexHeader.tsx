import styles from "./PokedexHeader.module.css";

export type DisplayMode = "pagination" | "infinite";

export interface PokedexHeaderProps {
  displayMode: DisplayMode;
  onDisplayModeChange: (mode: DisplayMode) => void;
}

export function PokedexHeader({
  displayMode,
  onDisplayModeChange,
}: PokedexHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Pokedex</h1>
      <p className={styles.subtitle}>
        Discover and explore Pokemon with{" "}
        {displayMode === "pagination" ? "page controls" : "infinite scroll"}
      </p>
      <div className={styles.controls} aria-label="Display mode">
        <button
          className={`${styles.control} ${
            displayMode === "pagination" ? styles.controlActive : ""
          }`}
          type="button"
          onClick={() => onDisplayModeChange("pagination")}
          aria-pressed={displayMode === "pagination"}
        >
          Page Controls
        </button>
        <button
          className={`${styles.control} ${
            displayMode === "infinite" ? styles.controlActive : ""
          }`}
          type="button"
          onClick={() => onDisplayModeChange("infinite")}
          aria-pressed={displayMode === "infinite"}
        >
          Infinite Scroll
        </button>
      </div>
    </header>
  );
}
