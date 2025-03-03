# URL Shortener
## Description
A simple URL shortener built using NestJS for the backend and React with Vite for the frontend. The project is structured as a monorepo using TurboRepo for optimized task execution.

## Features

- Shorten long URLs with ease 
- Retrieve original URLs using short links 
- Simple and responsive frontend interface 
- REST API for URL shortening and redirection 
- Docker support for easy deployment

## Tech Stack

- Frontend: React (TypeScript), Vite, Vitest 
- Backend: Node.js (TypeScript), NestJS, Jest
- Database: PostgreSQL
- Containerization: Docker

## Prerequisites
- **Node.js v20+** (Ensure you have at least Node.js **v20** installed, as NestJS v11 requires it)
- **Docker & Docker Compose** (If running with Docker Compose, install it from [here](https://docs.docker.com/compose/install/))


## Available Commands

### Docker compose run
This requires docker to be installed and running, run this command if you want to start the app (backend, frontend and database), everything at once, no more config.
```sh
docker compose up
```

Go to http://localhost:3000/ and the app is ready to be used

For API documentation go: http://localhost:3000/api/docs

### Start the Development 
Install cli dependencies for development (optional)
```
npm install -g @nestjs/cli jest vite vitest turbo
```
Install dependencies 
```sh
npm install
```
if you don't have a postgres instance running, just run:
```
docker compose up -d postgres
```

Run both backend (API) and frontend (Web) together:
```sh
npm run dev
```

Run the tests
```
npm test
```

