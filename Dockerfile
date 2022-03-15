FROM node:16-alpine

ADD . /app

WORKDIR /app

RUN yarn install

EXPOSE 3000

WORKDIR /app/apps/aqua-webapp/

RUN yarn build

CMD yarn start:prod
