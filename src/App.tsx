import { useEffect, useState } from "react";
import { PokedexHeader, type DisplayMode } from "./components/PokedexHeader";
import { InfinitePokemonList } from "./features/pokemon/InfinitePokemonList";
import { PaginatedPokemonList } from "./features/pokemon/PaginatedPokemonList";
import "./App.css";

interface AppUrlState {
  displayMode: DisplayMode;
  currentPage: number;
}

function normalizeDisplayMode(value: string | null): DisplayMode {
  return value === "infinite" ? "infinite" : "pagination";
}

function normalizePage(value: string | null) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function readUrlState(): AppUrlState {
  const params = new URLSearchParams(window.location.search);
  return {
    displayMode: normalizeDisplayMode(params.get("mode")),
    currentPage: normalizePage(params.get("page")),
  };
}

function writeUrlState(nextState: AppUrlState, replace = false) {
  const params = new URLSearchParams(window.location.search);
  params.set("mode", nextState.displayMode);
  params.set("page", String(nextState.currentPage));

  const nextUrl = `${window.location.pathname}?${params.toString()}`;
  if (replace) {
    window.history.replaceState(null, "", nextUrl);
  } else {
    window.history.pushState(null, "", nextUrl);
  }
}

function App() {
  const [urlState, setUrlState] = useState(readUrlState);

  useEffect(() => {
    writeUrlState(readUrlState(), true);
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0 });

    const handlePopState = () => {
      setUrlState(readUrlState());
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.history.scrollRestoration = "auto";
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const setDisplayMode = (displayMode: DisplayMode) => {
    const nextState = {
      ...urlState,
      displayMode,
      currentPage: displayMode === "pagination" ? urlState.currentPage : 1,
    };
    setUrlState(nextState);
    writeUrlState(nextState);
  };

  const setCurrentPage = (currentPage: number) => {
    const nextState = { ...urlState, currentPage: Math.max(1, currentPage) };
    setUrlState(nextState);
    writeUrlState(nextState);
  };

  return (
    <main className="page">
      <PokedexHeader
        displayMode={urlState.displayMode}
        onDisplayModeChange={setDisplayMode}
      />
      {urlState.displayMode === "pagination" ? (
        <PaginatedPokemonList
          currentPage={urlState.currentPage}
          onPageChange={setCurrentPage}
        />
      ) : (
        <InfinitePokemonList />
      )}
    </main>
  );
}

export default App;
