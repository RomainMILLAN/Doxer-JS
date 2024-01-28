FROM node:21 as base

WORKDIR /home/node/app
COPY package*.json ./
COPY ./src/ /home/node/app/src
COPY ./tsconfig.json /home/node/app
COPY ./types.d.ts /home/node/app
COPY ./package.json /home/node/app
RUN npm i
RUN npx tsc
ENV TZ Europe/Paris

FROM base as production
ENV NODE_PATH=./build
RUN npm run build
