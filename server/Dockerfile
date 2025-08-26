FROM node:20

RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY wait-for-postgres.sh ./
RUN chmod +x wait-for-postgres.sh

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "./wait-for-postgres.sh postgres && npx nodemon index.js"]