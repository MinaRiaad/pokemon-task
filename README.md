# Pokedex

A responsive Pokemon browser built with React, TypeScript, Vite, TanStack Query, and TanStack Virtual. The app uses the public PokeAPI to list Pokemon, switch between pagination and load-more browsing, and open a detailed Pokemon profile.

Live app: https://pokemon-task.pages.dev

## Features

- Paginated Pokemon list with URL-persisted page state
- Load-more browsing mode for longer lists
- Virtualized card grid for smoother rendering with many Pokemon
- Pokemon details page with artwork, type tags, base stats, abilities, height, weight, and base experience
- Suspense-based loading states
- Error fallback with retry support
- URL-persisted display mode and selected Pokemon
- Centralized API layer with PokeAPI base URL configured by environment variable
- Reusable UI components and CSS modules
- Design tokens for colors, spacing, shadows, widths, and shared UI values

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Query
- TanStack Virtual
- CSS Modules
- PokeAPI

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

The app expects this variable:

```env
VITE_POKEAPI_BASE_URL=https://pokeapi.co
```

Start the development server:

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev
```

Runs the app locally with Vite.

```bash
npm run build
```

Type-checks the project and creates a production build.

```bash
npm run lint
```

Runs ESLint across the project.

```bash
npm run preview
```

Serves the production build locally.

## API

The app reads data from PokeAPI:

- List Pokemon: `GET /api/v2/pokemon?limit=20&offset=0`
- Pokemon details: `GET /api/v2/pokemon/{id}`

The base URL is configured in `.env`:

```env
VITE_POKEAPI_BASE_URL=https://pokeapi.co
```

The `/api/v2` prefix is handled in the API client, so endpoint functions do not need to repeat it.

## Project Structure

```text
src/
  api/                  PokeAPI client, endpoint functions, query hooks
  components/           Reusable UI components
  features/pokemon/     Pokemon list and details feature views
  App.tsx               URL state and screen composition
  index.css             Global styles and design tokens
  queryClient.ts        TanStack Query client configuration
```

## Browsing Modes

The app supports two list modes:

- `pagination`: classic page controls with the current page stored in the URL
- `infinite`: load-more browsing with a virtualized grid

Example URLs:

```text
/?mode=pagination&page=2
/?mode=infinite&page=1
/?mode=pagination&page=1&pokemon=4
```

## Quality Checks

Before submitting changes, run:

```bash
npm run lint
npm run build
```
