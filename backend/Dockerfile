FROM node:18.19

WORKDIR /app

COPY tsconfig*.json ./

COPY package*.json ./

RUN npm ci

COPY . .

COPY .env ./

RUN npm run build

RUN chown -R node:node ./

USER node

EXPOSE 8080

CMD ["npm", "run", "start:prod"]