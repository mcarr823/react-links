# Links

[![Jest](https://github.com/mcarr823/react-links/actions/workflows/jest.yml/badge.svg)](https://github.com/mcarr823/react-links/actions/workflows/jest.yml)
[![Docker Image amd64](https://github.com/mcarr823/react-links/actions/workflows/docker-image.yml/badge.svg)](https://github.com/mcarr823/react-links/actions/workflows/docker-image.yml)
[![Docker Image arm64](https://github.com/mcarr823/react-links/actions/workflows/docker-aarch64.yml/badge.svg)](https://github.com/mcarr823/react-links/actions/workflows/docker-aarch64.yml)

Links is a free, open-source, self-hosted website which stores and syncs your bookmarks.

It aims to provide a replacement for your browser's new tab page, and to provide an alternative to your browser's built-in bookmarks.

Its primary focus is on providing syncable tab groups, which allow you to open several websites at once.

![Home screen](screenshots/home.png)

## Running

### Docker

You can run this website on your own machine via the official docker image on GitHub.

It runs on port 3000 by default and requires the /app/data volume to be specified.

For example, to run on an AMD64 device:

`docker run -p 3000:3000 -v ./data:/app/data ghcr.io/mcarr823/react-links:amd64`

Or for ARM64 devices:

`docker run -p 3000:3000 -v ./data:/app/data ghcr.io/mcarr823/react-links:arm64`

### Docker Compose

See the example [docker compose](docker-compose.yml) file.

## Development

### Dev Container

The easiest way to develop this application is to run the dev container provided.

Microsoft provide instructions on setting up and running dev containers [here](https://code.visualstudio.com/docs/devcontainers/containers).

### Locally

Alternatively, you can develop the app by installing NodeJS v22 and running

`npm i`

from within the `src` directory to install the app's dependencies, then

`npm run dev`

to run it.

## TODO

- Split back-end server and front-end website into separate repos
- Add docker container and workflow
- Create browser extension
- Option to auto-sync with polling or websockets
- Button to manually sync
- Import and export