# This dockerfile is partly based on instructions from
# https://towardsserverless.com/articles/dockerize-nextjs-app

# Build with the Microsoft TS/Node container, because it already contains all
# of the tools we need.
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm AS build

# Build in the /app directory
WORKDIR /app

# Copy and install the dependencies for the project
COPY src/package.json src/package-lock.json ./
RUN npm install

# Copy all other project files to working directory
COPY ./src .

# Run the next build process and generate the artifacts
RUN npm run build


# The build process is done.
# Now let's setup the actual container in which the app will reside.
# We'll use Alpine instead to make the container significantly smaller.
FROM node:22-alpine

# update and install latest dependencies, add dumb-init package
# add a non root user
RUN apk update && apk upgrade && apk add dumb-init && adduser -D nextuser 

# set work dir as app
WORKDIR /app

# copy the public folder from the project as this is not included in the build process
COPY --from=build --chown=nextuser:nextuser /app/public ./public

# copy the standalone folder inside the .next folder generated from the build process 
COPY --from=build --chown=nextuser:nextuser /app/.next/standalone ./

# copy the static folder inside the .next folder generated from the build process 
COPY --from=build --chown=nextuser:nextuser /app/.next/static ./.next/static

# set non root user
USER nextuser

# expose 3000 on container
EXPOSE 3000

# set app host, port and node env
ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production

# start the app with dumb init to spawn the Node.js runtime process
# with signal support
CMD ["dumb-init","node","server.js"]