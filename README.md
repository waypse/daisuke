# Daisuke (Name will maybe change)

A song-recognition app, similar to shazam

## Description

Song indexing:

- Youtube
- Spotify
- Song finding through microphone.
- Song finding through device audio.

## Getting Started

### Dependencies

- [Node.js](https://nodejs.org/en) ver. ^20.\*
- [pnpm](https://pnpm.io)
- [Docker](https://docs.docker.com) and [docker-compose](https://docs.docker.com/compose)

### Installing

- Copy the .env.example file and replace what needed.
- dockerfiles are multi-staged and depend on ENV flag inside .env (dev/prod)
- inside `/server` create a file called `shazamdb.sqlite`

```
cd server && touch shazamdb.sqlite
```

- run `pnpm install` inside both `/server` and `/svelte-kit`

### Executing program

After executing the above steps:

```
docker compose up -d --build
```

## Authors

Slava pankov
