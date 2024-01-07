FROM node as base

WORKDIR /home/node/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npx tsc
ENV TZ Europe/Paris

FROM base as production
ENV NODE_PATH=./build
