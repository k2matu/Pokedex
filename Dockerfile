# -------- Stage 1: Build Frontend --------
FROM node:20 AS build-client

WORKDIR /usr/src/client

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build

# -------- Stage 2: Serve Frontend in Development --------
FROM node:20 AS serve-client

WORKDIR /usr/src/client

COPY --from=build-client /usr/src/client/dist ./dist

COPY client/package*.json ./
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

# -------- Stage 3: Build Backend --------

FROM node:20 AS build-server

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /usr/src/app

COPY server/package*.json ./
RUN rm -rf node_modules
RUN npm install && ls -la node_modules/

COPY server/wait-for-postgres.sh ./
RUN chmod +x wait-for-postgres.sh

COPY --from=build-client /usr/src/client/dist ./public

COPY server/ ./

EXPOSE 3001

CMD ["./wait-for-postgres.sh", "postgres", "npx", "nodemon", "index.js"]


