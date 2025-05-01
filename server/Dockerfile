# Base image
FROM node:lts-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY . .
RUN pnpm install


# ============ Development Stage ============
FROM base AS dev
EXPOSE 3000
CMD ["pnpm", "run", "start:dev"]


# ============ Production Stage ============
FROM base AS prod
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "start:prod"]