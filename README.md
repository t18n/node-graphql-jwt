# Node GraphQL JWT

A simple monorepo Node GraphQL JWT app using

- Docker
- Typeorm
- Apollo
- Type Graphql
- Turborepo
- Pnpm
- Eslint
- Create React App
- Storybook 6
- Chakra UI
- Jest

## Prerequisites

- Node >14
- PNpm >6

## Getting started

- Change `**/.env.sample` files to `**/.env`
- Install pnpm `npm install -g pnpm`
- Install all packages: `pnpm install`
- Terminal 1: `docker compose up`
- Terminal 2: `pnpm backend migrate:run && pnpm backend start`
- Terminal 3 `pnpm web gen && pnpm web start`

## TODO

- [ ] Web E2E test
