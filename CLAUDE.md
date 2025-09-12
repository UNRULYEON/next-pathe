# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**next-api-monorepo** is a Turborepo monorepo that scrapes [pathe.nl](https://www.pathe.nl) to find movies with new timetables and notify users for ticket reservations.

## Monorepo Structure

This is a Turborepo monorepo with Bun as the package manager. The repo contains:

- **`apps/web`** - React 19 + Vite frontend application (@next-pathe/web)
- **`apps/server`** - Bun + Elysia API server (@next-pathe/server)
- Shared configuration for TypeScript and Biome (linting/formatting)

## Essential Commands

### Development
```bash
# Start all apps in development mode
bun dev

# Start specific app
turbo dev --filter=web    # Web client (port 5173)
turbo dev --filter=server # API server (port 3000)

# Start server only with hot reload
cd apps/server && bun dev
```

### Docker & Database
```bash
# Start PostgreSQL + Drizzle Studio
bun docker:dev

# Stop development containers
bun docker:dev:down

# View container logs
bun docker:dev:logs

# Production Docker commands
bun docker:prod
bun docker:prod:down
bun docker:prod:logs
```

### Building & Testing
```bash
# Build all apps
bun build

# Build specific app
turbo build --filter=web
turbo build --filter=server

# Type checking
bun check-types
```

### Code Quality
```bash
# Check formatting/linting with Biome
bun biome:check

# Run linting only
bun biome:lint

# Fix formatting and linting issues
bun biome:fix
```

## Architecture

### Frontend (`apps/web`)
- **Framework**: React 19 + TypeScript + Vite
- **Build Tool**: Vite with React SWC plugin
- **Dev Server**: Runs on port 5173
- **Package**: @next-pathe/web

### Backend (`apps/server`) 
- **Runtime**: Bun with hot reload (`--watch --hot`)
- **Framework**: Elysia with static plugin
- **Server**: Runs on port 3000
- **Endpoints**: 
  - `/` - Serves static files
  - `/health` - Health check endpoint
- **Package**: @next-pathe/server

### Database Stack (Docker)
- **PostgreSQL**: Development database (port 5432)
- **Drizzle Studio**: Database admin UI (port 4983)
- **Docker Compose**: Located in `apps/server/docker/`

### Package Management & Tooling
- **Package Manager**: Bun v1.2.21 with workspace configuration
- **Monorepo**: Turborepo for task coordination and caching
- **Code Quality**: Biome for unified formatting/linting (replaces ESLint/Prettier)
- **API Testing**: Yaak for API endpoint testing

## Key Configuration Files

- **`turbo.json`** - Defines build pipeline, task dependencies, and caching
- **`biome.json`** - Unified linting and formatting rules
- **`package.json`** - Root workspace configuration with scripts
- **`apps/server/docker/docker-compose.dev.yml`** - Development database stack
- Individual app `package.json` files with app-specific dependencies and scripts

## Development URLs

| URL | Service | Description |
|-----|---------|-------------|
| `http://localhost:5173` | Web Client | React + Vite frontend |
| `http://localhost:3000` | API Server | Bun + Elysia backend |
| `http://localhost:4983` | Drizzle Studio | Database admin interface |