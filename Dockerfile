FROM node as base

WORKDIR /home/node/app
COPY package*.json ./
RUN npm i
COPY . .
ENV TZ Europe/Paris

FROM base as production
ENV NODE_PATH=./build
#RUN npm run build