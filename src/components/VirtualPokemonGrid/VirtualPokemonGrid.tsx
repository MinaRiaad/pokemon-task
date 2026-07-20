import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useState } from "react";
import {
  getPokemonArtworkUrl,
  getPokemonIdFromUrl,
  type PokemonListItem,
} from "../../api/pokemon";
import { PokemonCard } from "../PokemonCard";
import styles from "./VirtualPokemonGrid.module.css";

export interface VirtualPokemonGridProps {
  items: PokemonListItem[];
  onPokemonSelect?: (id: number) => void;
}

const DESKTOP_COLUMNS = 4;
const MOBILE_COLUMNS = 2;
const DESKTOP_ROW_HEIGHT = 218;
const MOBILE_ROW_HEIGHT = 190;

function getColumnCount() {
  if (typeof window === "undefined") return DESKTOP_COLUMNS;
  return window.matchMedia("(max-width: 720px)").matches
    ? MOBILE_COLUMNS
    : DESKTOP_COLUMNS;
}

export function VirtualPokemonGrid({
  items,
  onPokemonSelect,
}: VirtualPokemonGridProps) {
  const [columnCount, setColumnCount] = useState(getColumnCount);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const handleChange = () => setColumnCount(getColumnCount());

    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const rowCount = Math.ceil(items.length / columnCount);
  const rows = useMemo(
    () =>
      Array.from({ length: rowCount }, (_, rowIndex) =>
        items.slice(
          rowIndex * columnCount,
          rowIndex * columnCount + columnCount,
        ),
      ),
    [columnCount, items, rowCount],
  );

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () =>
      columnCount === MOBILE_COLUMNS ? MOBILE_ROW_HEIGHT : DESKTOP_ROW_HEIGHT,
    overscan: 4,
  });

  return (
    <section
      className={styles.virtualGrid}
      style={{ height: `${virtualizer.getTotalSize()}px` }}
      aria-label="Pokemon list"
    >
      {virtualizer.getVirtualItems().map((virtualRow) => (
        <div
          key={virtualRow.key}
          className={styles.row}
          style={{ transform: `translateY(${virtualRow.start}px)` }}
        >
          {rows[virtualRow.index]?.map((item) => {
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
        </div>
      ))}
    </section>
  );
}
