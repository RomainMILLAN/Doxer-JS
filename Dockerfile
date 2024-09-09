FROM node:20 as base

ENV TZ=Europe/Paris
ENV NODE_PATH=./build
RUN apt-get update && apt-get install -y git nano

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY ./app /home/node/app

RUN npm install
RUN npx tsc
CMD ["npm", "run", "start"]
