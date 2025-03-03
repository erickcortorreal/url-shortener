FROM node:22.12-alpine

# Set working directory
WORKDIR /app

# Install required system dependencies
RUN apk add --no-cache python3 make g++

# Copy the entire project (source code)
COPY . .

# Install dependencies for the whole monorepo (without --workspaces)
RUN npm ci

# Build both frontend and backend
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
