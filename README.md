# URL Shortener
## Description
A simple URL shortener built using NestJS for the backend and React with Vite for the frontend. The project is structured as a monorepo using Nx and TurboRepo for optimized task execution.

## Prerequisites
- **Node.js v20+** (Ensure you have at least Node.js **v20** installed, as NestJS v11 requires it)
- **Yarn** (Recommended package manager for monorepo handling)
- **Docker & Docker Compose** (If running with Docker Compose, install it from [here](https://docs.docker.com/compose/install/))

## Project Structure
```
url-shortener/
├── api/       # NestJS backend
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   ├── .env
├── web/       # React (Vite) frontend
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   ├── .env
├── docker-compose.yml  # Configuration for Docker
├── package.json        # Monorepo workspace configuration
├── nx.json             # Nx workspace configuration
├── README.md           # Project documentation
└── .gitignore
```

## Available Commands

### Install Dependencies
```sh
yarn install
```

### Start the Development Servers
Run both backend (API) and frontend (Web) together:
```sh
yarn dev
```
Or run them separately:
```sh
yarn dev:api  # Start the NestJS API
yarn dev:web  # Start the React app
```

### Build for Production
```sh
yarn build
```

### Run with Docker
```sh
docker-compose up --build
```

### Run Prisma Migrations
```sh
cd api
npx prisma migrate dev --name init
```

### Test the API
```sh
cd api
yarn test
```

## Deployment
To deploy, push the Docker images to a registry and configure hosting for both backend and frontend.

