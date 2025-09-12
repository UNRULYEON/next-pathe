# API Server (@next-pathe/server)

The Bun + Elysia API server for the next-pathe project. This backend service handles scraping [pathe.nl](https://www.pathe.nl) for movie timetables and provides API endpoints for the web client.

## 🏗️ Tech Stack

- **Bun** runtime with hot reload support
- **Elysia** web framework
- **TypeScript** for type safety
- **PostgreSQL** database (via Docker)
- **Drizzle** ORM with Drizzle Studio
- **Biome** for linting and formatting

## 🛠️ Prerequisites

- [Bun](http://bun.sh) (v1.2.21)
- Docker (for PostgreSQL database)

## 🚀 Development

### From Monorepo Root

Start the API server along with other services:

```bash
# Install dependencies (from root)
bun install

# Start database stack
bun docker:dev

# Start all services
bun dev

# Start only API server
turbo dev --filter=server
```

### Standalone Development

From the `apps/server` directory:

```bash
# Install dependencies
bun install

# Start development server with hot reload
bun dev
```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start development server with hot reload on port 3000 |
| `bun test` | Run tests (not yet implemented) |
| `bun biome:check` | Check code formatting and linting |
| `bun biome:lint` | Run linting only |
| `bun biome:fix` | Fix formatting and linting issues |

## 🔗 Development URLs

- **API Server**: `http://localhost:3000`
- **Health Check**: `http://localhost:3000/health`
- **Database**: `localhost:5432` (PostgreSQL)
- **Drizzle Studio**: `http://localhost:4983`

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/` | GET | Serves static files |
| `/health` | GET | Health check endpoint |

## 🗄️ Database Setup

The server uses PostgreSQL with Drizzle ORM. Start the database stack:

```bash
# From monorepo root
bun docker:dev
```

This starts:
- **PostgreSQL** on port 5432
- **Drizzle Studio** on port 4983 for database management

### Database Configuration

Environment variables for database connection:
- `POSTGRES_DB` (default: next_pathe)
- `POSTGRES_USER` (default: postgres) 
- `POSTGRES_PASSWORD` (default: postgres)
- `DB_PORT` (default: 5432)
- `STUDIO_PORT` (default: 4983)

## 📁 Project Structure

```
apps/server/
├── src/
│   └── index.ts       # Main server entry point
├── docker/
│   └── docker-compose.dev.yml  # Database stack
├── public/            # Static files served at root
├── package.json       # Package dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## ⚡ Server Configuration

The Elysia server is configured with:

- **Static Plugin**: Serves files from `public/` directory
- **Hot Reload**: Automatic restart on file changes (`--watch --hot`)
- **TypeScript**: Native TypeScript support with Bun
- **Port 3000**: Default server port

## 🔧 Development Notes

- The API server is part of a Turborepo monorepo
- Hot reload is enabled for fast development iterations
- Static files are served from the `public/` directory
- Shared TypeScript and Biome configurations are inherited from the root
- Database runs in Docker containers for consistent development environment