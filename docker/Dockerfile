FROM node:16-alpine as base
# Alpine images missing dependencies
RUN apk add --no-cache git
WORKDIR /usr/app
# App and dev dependencies
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
# App source
COPY . .

# Build step for production
FROM base
RUN yarn build
# Prune dev dependencies, modules ts files, yarn cache after build
RUN yarn install && \
    yarn autoclean --init && \
    echo *.ts >> .yarnclean && \
    yarn autoclean --force && \
    yarn cache clean
CMD ["node", "./index.js"]