# Web Client (@next-pathe/web)

The React 19 + Vite frontend application for the next-pathe project. This web client provides the user interface for interacting with movie timetable notifications from [pathe.nl](https://www.pathe.nl).

## 🏗️ Tech Stack

- **React 19** with TypeScript
- **Vite** build tool with React SWC plugin for fast builds
- **TypeScript** for type safety
- **Biome** for linting and formatting

## 🛠️ Prerequisites

- [Bun](http://bun.sh) (v1.2.21)
- Node.js >= 18

## 🚀 Development

### From Monorepo Root

Start the web client along with other services:

```bash
# Install dependencies (from root)
bun install

# Start all services
bun dev

# Start only web client
turbo dev --filter=web
```

### Standalone Development

From the `apps/web` directory:

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Preview production build
bun preview
```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start Vite development server on port 5173 |
| `bun build` | Build the application for production |
| `bun preview` | Preview the production build locally |
| `bun check-types` | Run TypeScript type checking |
| `bun biome:check` | Check code formatting and linting |
| `bun biome:lint` | Run linting only |
| `bun biome:fix` | Fix formatting and linting issues |

## 🔗 Development URLs

- **Development Server**: `http://localhost:5173`
- **API Server**: `http://localhost:3000` (when running full stack)

## 📁 Project Structure

```
apps/web/
├── src/                 # Source files
├── public/             # Static assets
├── index.html         # HTML entry point
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Package dependencies and scripts
```

## ⚡ Vite Configuration

This project uses Vite with the following setup:

- **@vitejs/plugin-react-swc** for fast React refresh using SWC
- **TypeScript** support out of the box
- **HMR (Hot Module Replacement)** for instant updates during development

## 🔧 Development Notes

- The web client is part of a Turborepo monorepo
- Shared TypeScript and Biome configurations are inherited from the root
- For production builds, run from the monorepo root using `bun build` or `turbo build --filter=web`