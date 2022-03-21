FROM node:16-alpine

ADD . /app

WORKDIR /app

RUN yarn install && mv entrypoint.sh /app/apps/aqua-webapp/

EXPOSE 3000

WORKDIR /app/apps/aqua-webapp/

# Build and prepare typeorm for migrations
RUN yarn build && npx typeorm --help

CMD sh entrypoint.sh
