# TestSystem

## Description
Back-end for TestSystem. It utilizes Node.js with NestJS as a base framework and Postgres as a database.

## Configuration
Configure the app within the `.env` file.

Generate your own JWT Secret key to keep it secure -- execute the command and paste it into your file.
```bash
JWT_SECRET_KEY=$(tr -dc A-Za-z0-9 < /dev/urandom | head -c 32); echo "JWT_SECRET_KEY=$JWT_SECRET_KEY"
```

Set as `DB_HOST` as `localhost` to start with local development.
```bash
echo "DB_HOST=localhost"
```

## Installation

```bash
# install dependencies
npm ci

# run migrations
npm run migration:run
```

## Running the app

```bash
# watch mode
npm run start:dev

# run interactive shell (REPL)
npm run start:shell

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
