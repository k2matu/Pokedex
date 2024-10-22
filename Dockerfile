# -------- Stage 1: Serve Frontend --------
FROM node:20 AS serve-client

WORKDIR /usr/src/client

COPY client/package*.json ./
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

# -------- Stage 2: Build Backend --------

FROM node:20 AS build-server

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /usr/src/app

COPY server/package*.json ./
RUN npm install

COPY server/wait-for-postgres.sh ./
RUN chmod +x wait-for-postgres.sh

COPY server/ ./

EXPOSE 3001

CMD ["./wait-for-postgres.sh", "postgres", "npx", "nodemon", "index.js"]
