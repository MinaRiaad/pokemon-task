const DEFAULT_POKEAPI_BASE_URL = "https://pokeapi.co";
const POKEAPI_VERSION_PATH = "/api/v2";

export class PokeApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "PokeApiError";
    this.status = status;
  }
}

function getPokeApiBaseUrl() {
  return (
    import.meta.env.VITE_POKEAPI_BASE_URL ?? DEFAULT_POKEAPI_BASE_URL
  ).replace(/\/+$/, "");
}

function normalizeEndpoint(endpoint: string) {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return path.startsWith(POKEAPI_VERSION_PATH)
    ? path.slice(POKEAPI_VERSION_PATH.length) || "/"
    : path;
}

export function buildPokeApiUrl(endpoint: string) {
  return `${getPokeApiBaseUrl()}${POKEAPI_VERSION_PATH}${normalizeEndpoint(endpoint)}`;
}

export async function fetchPokeApi<T>(
  endpoint: string,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(buildPokeApiUrl(endpoint), { signal });

  if (!response.ok) {
    throw new PokeApiError(
      `PokeAPI request failed with status ${response.status}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}
