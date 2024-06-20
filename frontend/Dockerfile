FROM node:18.19

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 8000

CMD ["/bin/sh", "/app/docker/entrypoint.sh"]