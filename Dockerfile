FROM node:16-alpine

ADD . /app

WORKDIR /app

RUN yarn install && mv entrypoint.sh /app/apps/aqua-webapp/

EXPOSE 3000

WORKDIR /app/apps/aqua-webapp/

RUN yarn build && npx typeorm --help

CMD bash entrypoint.sh
