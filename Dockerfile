FROM node:22.12-alpine

# Set working directory
WORKDIR /app

# Install required system dependencies
RUN apk add --no-cache python3 make g++

# Copy only necessary package files first (for better caching)
COPY package.json package-lock.json turbo.json ./

# Install dependencies for the whole monorepo (without --workspaces)
RUN npm ci --omit=dev

# Copy the entire project (source code)
COPY . .

# Install global dependencies (TypeScript, NestJS CLI, Vite)
RUN npm install -g typescript @nestjs/cli vite

# Build both frontend and backend
RUN npm run build

# Expose API port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
