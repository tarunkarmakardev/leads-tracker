FROM node:18-alpine3.17
WORKDIR /app
COPY package.json .
RUN yarn set version berry
RUN yarn config set nodeLinker node-modules
RUN yarn
COPY . .
CMD [ "yarn", "start:prod" ]