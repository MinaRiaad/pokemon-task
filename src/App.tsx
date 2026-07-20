import { Suspense, useEffect, useState } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { PokedexHeader, type DisplayMode } from "./components/PokedexHeader";
import { PokemonGrid } from "./components/PokemonGrid";
import ErrorBoundary from "./ErrorBoundary";
import { InfinitePokemonList } from "./features/pokemon/InfinitePokemonList";
import { PokemonDetailsView } from "./features/pokemon/PokemonDetailsView";
import { PaginatedPokemonList } from "./features/pokemon/PaginatedPokemonList";
import pokemonListStyles from "./features/pokemon/PokemonList.module.css";
import "./App.css";

interface AppUrlState {
  displayMode: DisplayMode;
  currentPage: number;
  selectedPokemonId: number | null;
}

function normalizeDisplayMode(value: string | null): DisplayMode {
  return value === "infinite" ? "infinite" : "pagination";
}

function normalizePage(value: string | null) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function normalizePokemonId(value: string | null) {
  const pokemonId = Number(value);
  return Number.isInteger(pokemonId) && pokemonId > 0 ? pokemonId : null;
}

function readUrlState(): AppUrlState {
  const params = new URLSearchParams(window.location.search);
  return {
    displayMode: normalizeDisplayMode(params.get("mode")),
    currentPage: normalizePage(params.get("page")),
    selectedPokemonId: normalizePokemonId(params.get("pokemon")),
  };
}

function writeUrlState(nextState: AppUrlState, replace = false) {
  const params = new URLSearchParams(window.location.search);
  params.set("mode", nextState.displayMode);
  params.set("page", String(nextState.currentPage));
  if (nextState.selectedPokemonId) {
    params.set("pokemon", String(nextState.selectedPokemonId));
  } else {
    params.delete("pokemon");
  }

  const nextUrl = `${window.location.pathname}?${params.toString()}`;
  if (replace) {
    window.history.replaceState(null, "", nextUrl);
  } else {
    window.history.pushState(null, "", nextUrl);
  }
}

function PokemonErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div className={pokemonListStyles.errorState} role="alert">
      <p className={pokemonListStyles.statusText}>Unable to load Pokemon.</p>
      <button
        className={pokemonListStyles.retryButton}
        type="button"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
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
      selectedPokemonId: null,
    };
    setUrlState(nextState);
    writeUrlState(nextState);
  };

  const setCurrentPage = (currentPage: number) => {
    const nextState = {
      ...urlState,
      currentPage: Math.max(1, currentPage),
      selectedPokemonId: null,
    };
    setUrlState(nextState);
    writeUrlState(nextState);
  };

  const setSelectedPokemonId = (selectedPokemonId: number) => {
    const nextState = { ...urlState, selectedPokemonId };
    setUrlState(nextState);
    writeUrlState(nextState);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const clearSelectedPokemonId = () => {
    const nextState = { ...urlState, selectedPokemonId: null };
    setUrlState(nextState);
    writeUrlState(nextState);
  };

  if (urlState.selectedPokemonId) {
    const selectedPokemonId = urlState.selectedPokemonId;

    return (
      <main className="page detailPage">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <PokemonErrorFallback onRetry={resetErrorBoundary} />
              )}
            >
              <Suspense
                fallback={
                  <p className={pokemonListStyles.loadingText}>
                    Loading Pokemon...
                  </p>
                }
              >
                <PokemonDetailsView
                  pokemonId={selectedPokemonId}
                  onBack={clearSelectedPokemonId}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </main>
    );
  }

  return (
    <main className="page">
      <PokedexHeader
        displayMode={urlState.displayMode}
        onDisplayModeChange={setDisplayMode}
      />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <PokemonErrorFallback onRetry={resetErrorBoundary} />
            )}
          >
            <Suspense fallback={<PokemonGrid isLoading />}>
              {urlState.displayMode === "pagination" ? (
                <PaginatedPokemonList
                  currentPage={urlState.currentPage}
                  onPageChange={setCurrentPage}
                  onPokemonSelect={setSelectedPokemonId}
                />
              ) : (
                <InfinitePokemonList onPokemonSelect={setSelectedPokemonId} />
              )}
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </main>
  );
}

export default App;
