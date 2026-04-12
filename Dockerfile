FROM node:23-slim AS base

ENV TZ=Europe/Paris

RUN mkdir -p /home/node/app/logs
WORKDIR /home/node/app
COPY ./app /home/node/app

RUN npm install
RUN npx tsc
CMD ["npm", "run", "start"]
