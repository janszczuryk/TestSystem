# TestSystem

## Description
Front-end for TestSystem. It is built on Vue.js with Vite on top of that. Also, the Vuetify is used as the Vue component framework.

## Installation

```bash
# install dependencies
npm ci
```

## Running the app

```bash
# development mode (with hmr)
npm run dev

# build for production
npm run build

# run a preview
npm run preview
```

Go to [localhost:3000](http://localhost:3000/) if using development mode. When running in production (with docker compose) -- go with `http://<YOUR_HOST>:80/` (inside container it is listening on `0.0.0.0:8000`) 