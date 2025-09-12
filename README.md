# next-pathe

`next-pathe` is a Turborepo monorepo that scrapes [https://pathe.nl](https://www.pathe.nl), looks for movies that have new timetables and notifies you so you can be the first to reserve tickets.

## 🏗️ Project Structure

This monorepo contains:

- **`apps/web`** - React 19 + Vite frontend application (runs on port 5173)
- **`apps/server`** - Bun + Elysia API server (runs on port 3000)
- Shared configuration for TypeScript and Biome (linting/formatting)

## 🛠️ Prerequisites

- [Bun](http://bun.sh) (v1.2.21)
- [Docker](https://www.docker.com)

## 🥑 Usage

### Local Development

Install the dependencies:

```bash
bun install
```

A [`docker-compose.dev.yml`](apps/server/docker/docker-compose.dev.yml) file is available to run PostgreSQL and [drizzle-studio](https://gateway.drizzle.team) in Docker. Start the database stack:

```bash
bun docker:dev
```

Open a new terminal and run the development server for both web client and API server:

```bash
bun dev
```

### 🔗 Development URLs

| URL | Description |
| --- | --- |
| [`http://localhost:5173`](http://localhost:5173) | Web Client (React + Vite) |
| [`http://localhost:3000`](http://localhost:3000) | API Server (Bun + Elysia) |
| [`http://localhost:4983`](http://localhost:4983) | Drizzle Studio (Database client) |

### 🐐 Yaak

[Yaak](https://yaak.app) is the API client used in this project for testing API endpoints.

## ⌘ Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start all apps in development mode |
| `bun build` | Build all applications |
| `bun check-types` | Run TypeScript type checking |
| `bun biome:check` | Check code formatting and linting |
| `bun biome:fix` | Fix formatting and linting issues |
| `bun docker:dev` | Start PostgreSQL + Drizzle Studio |
| `bun docker:dev:down` | Stop development Docker containers |
| `bun docker:dev:logs` | View development Docker logs |

### Individual App Commands

```bash
# Run specific app only
turbo dev --filter=web    # Start web client only
turbo dev --filter=server # Start API server only

# Build specific app
turbo build --filter=web
turbo build --filter=server
```
