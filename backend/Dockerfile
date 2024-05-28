FROM node:18.19

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

RUN chown -R node:node ./

USER node

EXPOSE 8080

CMD ["/bin/sh", "/app/docker/entrypoint.sh"]