import { useState } from "react";
import { PokedexHeader, type DisplayMode } from "./components/PokedexHeader";
import { InfinitePokemonList } from "./features/pokemon/InfinitePokemonList";
import { PaginatedPokemonList } from "./features/pokemon/PaginatedPokemonList";
import "./App.css";

function App() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("pagination");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="page">
      <PokedexHeader
        displayMode={displayMode}
        onDisplayModeChange={setDisplayMode}
      />
      {displayMode === "pagination" ? (
        <PaginatedPokemonList
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      ) : (
        <InfinitePokemonList />
      )}
    </main>
  );
}

export default App;
