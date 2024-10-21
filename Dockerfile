# -------- Stage 1: Build Frontend --------
FROM node:20 AS build-client

WORKDIR /usr/src/client

# Install dependencies and build the React frontend
COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build

# -------- Stage 2: Build Backend --------
FROM node:20 AS build-server

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /usr/src/app

# Install backend dependencies
COPY server/package*.json ./
RUN npm ci

# Copy the Express server and related files
COPY server/ ./

# Copy the frontend build from the previous stage to the backend
COPY --from=build-client /usr/src/client/dist ./dist

# Copy the init.sql file to the PostgreSQL initialization directory
COPY init.sql /docker-entrypoint-initdb.d/

# Set environment variables (adjust if needed)
ENV NODE_ENV=production

# Expose the backend port
EXPOSE 3001

# Wait for PostgreSQL to be ready and then run the backend server
CMD ["./wait-for-postgres.sh", "db-pokedex.internal", "node", "index.js", "--host", "0.0.0.0"]

